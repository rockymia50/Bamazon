# Bamazon

Bamazon is a Node app based on a virtual Amazon type store front. In my store you will find a list of items to
purchase in these categories.

id<br>
product_name<br>
department_name<br>
price<br> 
stock_quantity<br> 

As a customer you order what product you want based off of quantity. If its avaiable the program will proceed with the order
and update the inventory as you continue your shopping. If the the quantity exceeds the amount avaiable your request will be
cancelled but you can still shop for more items.


<strong>Getting Started</strong>

I used Workbench and Node.js to execute this program with the help of these npm required packages

*Npm Packages*

var mysql = require("mysql");<br>
var inquirer = require("inquirer");<br>
var Table = require("easy-table");<br>
var CFonts = require('cfonts');<br>

Make sure these are installed in the folder you are working out off.

Next, finished the rest of connection to the database you are using, then start writing the code 
that you want to use and manipulate within the database.


This app does have scalibility to included a Manager and Supervisor interface based off the customer experience platform.
