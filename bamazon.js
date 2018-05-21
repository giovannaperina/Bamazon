// const mysql = require("mysql");
// const inquirer = require('inquirer');
// const table = require('cli-table');
// const chalk = require('chalk');

// var connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,

//   user: "root",
//   password: "root",
//   database: "bamazon",
// });

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log( 'Welcome to Bamazon!! \n')
//   displayTable();
// });

// var selectedProduct = {}; //object
// var productsList = []; //array

// function displayTable() {
//   connection.query('SELECT * FROM products', function (error, response) {
//     for (var i = 0; i < response.length; i++) {
//       console.log(response[i].id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity);
//       productsList[response[i].id] = response[i];
//     }
//     customerPrompt();
//  });
// }

// function customerPrompt(){
//   inquirer.prompt([{
//     type: 'input',
//     name: 'id',
//     message: 'Please, enter the ID of the product you would like to purchase?',
//     validate: function (input) {
//       if (input === '' || productsList[input] === undefined) {
//         console.log('\n Please, enter a valid id number.')
//         return false;
//       } else {
//         selectedProduct = productsList[input];
//         return true;
//       }
//     }
//   }
// ]).then( input => {

//   inquirer.prompt([{
//     type: 'input',
//     name: 'quantity',
//     message: `How many ${selectedProduct.product_name} would you like to purchase?`,
//     validate: function (quantity) {
//       connection.query('SELECT * FROM products WHERE ?', { id: input.id }, function(error, response){

//         if (error) throw error;               
//         if (quantity < response[0].stock_quantity){
//           console.log(`\n \n Your order has been successfully processed!! Your total cost is $${quantity * response[0].price} `)
//           connection.query('UPDATE products SET stock_quantity = ? WHERE id = ?', [response[0].stock_quantity - quantity, input.id])
//           finalPrompt();
//         }

//       })
//       // if (quantity > response[0].stock_quantity){
//       //   console.log('\n Insufficient quantity!')
//       //   finalPrompt();
//       //   return false;
//       // }
//     }
//   }
// ])

// })
// }
// var finalPrompt = function() {
//   inquirer.prompt({
//       name: "action",
//       type: "list",

//       message: " Would like to continue shopping?\n",
//       choices: ["Yes", "No"]
//   }).then(function(answer) {
//       switch(answer.action) {
//           case 'Yes':
//               displayTable();
//           break;

//           case 'No':
//               console.log('Thanks for choosing us!!')
//           break;
//       }
//   })
// };
