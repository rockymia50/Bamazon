var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");
var CFonts = require('cfonts');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;

    
 
CFonts.say('BAMAZON!', {
    font: 'block',        //define the font face 
    align: 'left',        //define text alignment 
    colors: ['white'],    //define all colors 
    background: 'Black',  //define the background color 
    letterSpacing: 1,     //define letter spacing 
    lineHeight: 1,        //define the line height 
    space: true,          //define if the output text should have empty lines on top and on the bottom 
    maxLength: '0'        //define how many character can be on one line 
});

var data = [
    {id:1,product_name:"Jordan 11",department_name:"sneakers",price: 100.00,stock_quantity: 200},
    {id:2,product_name:"bally loafer",department_name:"shoes",price:200.00,stock_quantity: 250},
    {id:3,product_name:"Geox",department_name:"recreation",price: 750.00,stock_quantity: 356},
    {id:4,product_name:"Curry 6",department_name:"sneakers",price: 150.00,stock_quantity: 286},
    {id:5,product_name:"used Iphone 6",department_name:"electronics",price: 150.00,stock_quantity:456},
    {id:6,product_name:"Canoe",department_name:"recreation",price: 150.00,stock_quantity:10},
    {id:7,product_name:"speaker",department_name:"electronics",price: 150.00,stock_quantity:276},
    {id:8,product_name:"Canoe",department_name:"recreation",price: 150.00,stock_quantity:500},
    {id:9,product_name:"dining chair",department_name:"furniture",price: 150.00,stock_quantity:400},
    {id:10,product_name:"Iphone",department_name:"electronics",price: 150.00,stock_quantity:120},
    {id:11,product_name:"coffee table",department_name:"furniture",price: 150.00,stock_quantity:100},
    {id:12,product_name:"bunny",department_name:"toys",price: 150.00,stock_quantity:1},
    
  ]
   
  var t = new Table
   
  data.forEach(function(product) {
    t.cell('Number',product.id)  
    t.cell('Product Name', product.product_name)
    t.cell('Department', product.department_name)
    t.cell('Price, USD', product.price, Table.number(2))
    t.cell('Stock Quantity',product.stock_quantity)
    t.newRow()
  })
   
  console.log(t.toString())
    runSearch();
});

function runSearch() {
    inquirer
    // Prompt to start search and logging the answer
        .prompt({
            name: "ID",
            type: "rawlist",
            message: "What is the ID of the product you would like to buy?",
            choices: [
                "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
            ]
        })

        .then(function (answer) {
            console.log(answer.ID);
            

            selectQuantity(answer.ID);

        });
}

function selectQuantity(id) {
    inquirer
        .prompt({
            name: "quantity",
            type: "output",
            message: "How many units would you like to buy?"
        })
        .then(function (answer) {
            console.log(answer.quantity);
            // logging the answer of the prompt then running against inventory
            checkInventory(answer, id);

        });
}

function checkInventory(answer, id) {
    // query the database to see if user response is fillable
    var query = "SELECT * FROM products WHERE id = ?";
    connection.query(query, [id], function (err, res) {
        console.log(res)
        // determine if we can get the order
        if ( res[0].stock_quantity > answer.quantity) {

            // if return true update stock_quantity
            var userQuantity = res[0].stock_quantity - answer.quantity;
            
            var query = connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: userQuantity
                },
                {
                  id: id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Order placed successfully!");
                runSearch();
              }
            );
          }
          else {
            // We are not able to fill the order at this time, we apologize and run search
            console.log("We cannot fullfill that order at this time. Please search again");
            runSearch();

          }
    }) 

};