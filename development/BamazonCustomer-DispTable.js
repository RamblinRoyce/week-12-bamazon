// Then create a Node application called BamazonCustomer.js. Running this application will:

// First Display All of the Items available for sale. This initial display, should include the ids, names, and prices of products for sale

// Users should then be prompted with two messages. The first message should ask them the ID of the product they would like to buy. The second message should ask them how many of the product they would like to buy.

// Once the customer has placed the order: Your application should...

// Check if your store has enough quantity of the product to meet the customer's request. If not, you should respond to the user by saying: "Insufficient quantity" and prevent the order from going through.

// If your store DOES have enough of the product to meet the customer's request, you should fulfill their order. This means that you should show them the total cost of their puchase. Then update the SQL database to reflect the remaining quantity.

// npm's
var mysql = require('mysql');
var inquirer = require('inquirer');

// mySQL connection
var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root", //Your username
    password: "tsingta0", //Your password
    database: "bamazon"
});

// connection tests
// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
//     start();
// })
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//   console.log('connected as id ' + connection.threadId);
// });


// display bamazon/products table
  // ItemID INT NOT NULL AUTO_INCREMENT,
  // ProductName VARCHAR(100) NULL,
  // DepartmentName VARCHAR(100) NULL,
  // Price DECIMAL(10,2) NULL,
  // StockQuantity INT NOT NULL,
connection.query('SELECT * FROM products', 
	function(err, res) {
	if (err) throw err;
	// console.log(res);
	console.log("ItemID \t ProductName \t DepartmentName \t Price \t Stock");
	console.log("-----------------------------------");
	for (var i = 0; i < res.length; i++) {
		console.log(res[i].ItemID + " : " + res[i].ProductName + " \t " + res[i].DepartmentName + " \t " + res[i].Price + " \t " + res[i].StockQuantity);
    }
    console.log("-----------------------------------");
    connection.end();
});


// connection.query('SELECT * FROM products WHERE genre=?', ['Dance'], function(err, res) {
//     for (var i = 0; i < res.length; i++) {
//         console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
//     }
// })

