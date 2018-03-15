var mysql = require("mysql");
var inquirer = require("inquirer");

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
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What is the ID of the product you would like to buy?",
            choices: [
                "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "What is the ID of the product you would like to buy?":
                    selectQuantity();
                    break;

            }
        });
}

function selectQuantity() {
    inquirer
        .prompt({
            name: "quantity",
            type: "output",
            message: "We have this remaining in our inventory!"
        })
        .then(function (answer) {
            var query = "SELECT * FROM products WHERE stock_quantity =ex ?";
            connection.query(query, {
                quantity: answer.quantity
            }, function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log("stock_quantity: " + res[i].stock_quantity );
                }
                runSearch();
            });
        });
}