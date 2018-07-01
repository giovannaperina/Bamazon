const mysql = require("mysql");
const inquirer = require('inquirer');
const bamazonTable = require("./table.js");
const colors = require('colors');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",
  password: "root",
  database: "bamazon",
});

connection.connect(function (err) {
  if (err) throw err;
  managerPrompt();
});

function managerPrompt(){
   
  inquirer.prompt([
  {
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: [
      {name: 'View Products for Sale', value: managerTable },
      {name: 'View Low Inventory', value: inventory },
      {name: 'Add to Inventory', value: addStock  },
      {name: 'Add New Product', value: addProduct},
      {name: 'Exit', value: exitManager}
    ]
  }])
  .then(input => {
      input.action()
  })
}

function managerTable() {
  var display = new bamazonTable();
  connection.query ('SELECT * FROM products', function (err,res){
    display.displayInventoryTable(res);
    managerPrompt();
  })
}

function inventory(){
  connection.query ('SELECT * FROM products', function (err,res){
    for (var i = 0; i < res.length; i++ ){
      if(res[i].stock_quantity < 5){
        console.log("\n \n" + res[i].id, res[i].product_name, res[i].stock_quantity + "\n \n")
      }
    }
    managerPrompt()
  })
}

function addStock(){
  inquirer.prompt([
		{
			type: 'input',
			name: 'id',
			message: 'Please, enter the ID of the product you would like to add on stock?',
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like to add?',
		}
	]).then(input => {
    const quantity = parseInt(input.quantity);
    const item = input.id
  
  
    connection.query('SELECT * FROM products WHERE ?', { id: item }, function(error, res){
      if (error) throw error;               
      if(quantity < res[0].stock_quantity){
        console.log(`\n \n The Bamazon has been updated ! You add ${quantity} item(s) on ${res[0].product_name}!   \n \n`.magenta);
        connection.query('UPDATE products SET stock_quantity = ? WHERE id = ?', [res[0].stock_quantity + quantity, item])
      }
      managerPrompt()
    })
  })
}

function addProduct(){
  inquirer.prompt([
    {
			type: 'input',
			name: 'product',
			message: 'Please enter the new product name.',
		},
		{
			type: 'input',
			name: 'department',
			message: 'Which department does the new product belong to?',
		},
		{
			type: 'input',
			name: 'price',
			message: 'What is the price per unit?',
			filter: Number
		},
		{
			type: 'input',
			name: 'stock_quantity',
			message: 'How many items are in stock?',
			filter: Number
    }
  ]).then (input =>{
    connection.query('INSERT INTO products SET ? ',{
      product_name: input.product, 
      department_name : input.department,
      price: input.price,
      stock_quantity: input.stock_quantity
    }, function(err,res){
      console.log(`\n \n The ${input.product} has been inserted at ${input.department} with ${input.stock_quantity} quantity and a total cost $${input.price} per unit \n \n`.magenta)
      managerPrompt()
    });
  })
}

function exitManager(){
  process.exit();
}
