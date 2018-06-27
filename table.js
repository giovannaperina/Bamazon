const Table = require('cli-table')
const colors = require('colors');

const bamazonTable = function(){

    let table = new Table({
    head: ['Id'.cyan, 'Product Name'.cyan, 'Department Name'.cyan, 'Price'.cyan, 'Stock Qauntity'.cyan],
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
            , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
            , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
            , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
    });




    this.displayInventoryTable = function(res) {
        
        for (var i = 0; i < res.length; i++) {
            table.push([ res[i].id , res[i].product_name, res[i].department_name, res[i].price, (res[i].stock_quantity < 30) ? `${res[i].stock_quantity}`.red : res[i].stock_quantity ]);
        }

        console.log('\n' + table.toString());
    }
}


module.exports = bamazonTable;