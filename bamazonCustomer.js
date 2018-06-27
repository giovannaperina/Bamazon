const mysql = require("mysql");
const inquirer = require('inquirer');
const bamazonTable = require("./table.js");
const colors = require('colors');


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",
  password: "root",
  database: "bamazon2",
});

connection.connect(function (err) {
  if (err) throw err;
  displayTable();
  console.log("========= WELCOME TO BAMAZON!!! ========= ".yellow)
});

var selectedProduct = {}; //object

const displayTable = () => {
  var productsList = []; //array
  var display = new bamazonTable();
  connection.query('SELECT * FROM products', function (error, response) {
    display.displayInventoryTable(response);
    for (var i = 0; i < response.length; i++) {
      productsList[response[i].id] = response[i];
    }
    console.log(' ');
    inquirer.prompt([{
          type: 'input',
          name: 'id',
          message: 'Please, enter the ID of the product you would like to purchase?'
        }
      ])
      .then(function(input) {
        if (input.id === '' || productsList[input.id] === undefined) {
          console.log('Please, enter a valid id number.')
          return false;
        } else {
          selectedProduct = productsList[input.id];
          selectQuantity(response, input.id);
          return true;
        }
      })
    });
    return;
}

const selectQuantity = (response, product_id) => {
  inquirer.prompt([{
      type: 'input',
      name: 'quantity',
      message: `How many ${selectedProduct.product_name} would you like to purchase?`
    }
  ]).then(function(input) {
    const quantity = input.quantity;

    if (quantity > response[0].stock_quantity){
      console.log('\n Insufficient quantity!')
      return false;
    }
    connection.query('SELECT * FROM products WHERE ?', { id: product_id }, function(error, response){
      if (error) throw error;               
      if(quantity < response[0].stock_quantity) {
        console.log(' ');
        console.log(`Your order has been successfully processed!! Your total cost is $${quantity * response[0].price}`.green);
        console.log(' ');
        continueShopping();
        connection.query('UPDATE products SET stock_quantity = ? WHERE id = ?', [response[0].stock_quantity - quantity, product_id]);
      }
    })
  });
  return;
}

const continueShopping = () => {
  inquirer.prompt({
      name: "action",
      type: "list",
      message: "Would like to continue shopping?",
      choices: ["Yes", "No"]
  }).then(function(input){

    switch(input.action) {
      case 'Yes':
        displayTable();
        return;
      break;
      case 'No':
          console.log(' ');
          console.log('========= Thank you for shopping with us!!! ========= '.yellow);
          process.exit();
          return;
      break;
    }
  });

  return;
}

