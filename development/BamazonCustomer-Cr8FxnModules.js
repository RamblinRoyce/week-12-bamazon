// Then create a Node application called BamazonCustomer.js. Running this application will:

// First Display All of the Items available for sale. This initial display, should include the ids, names, and prices of products for sale

// Users should then be prompted with two messages. The first message should ask them the ID of the product they would like to buy. The second message should ask them how many of the product they would like to buy.

// Once the customer has placed the order: Your application should...

// Check if your store has enough quantity of the product to meet the customer's request. If not, you should respond to the user by saying: "Insufficient quantity" and prevent the order from going through.

// If your store DOES have enough of the product to meet the customer's request, you should fulfill their order. This means that you should show them the total cost of their puchase. Then update the SQL database to reflect the remaining quantity.

// define npm's
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
  	console.log("Item \t Product \t Department \t Price \t Stock");
  	console.log("-----------------------------------");
  	for (var i = 0; i < res.length; i++) {
  		console.log(res[i].ItemID + "   " + res[i].ProductName + " \t " + res[i].DepartmentName + " \t " + res[i].Price + " \t " + res[i].StockQuantity);
    }
    console.log("-----------------------------------");
      // connection.end();

  // define prompt function
    inquirer.prompt([{
        name: "product",
        message: "What Product would you like to buy? [Quit with Q]"
    // }, {
    //     name: "qty",
    //     message: "How many would you like to buy?"
    }]).then(function(ansProd) {
        // console.log(answers.product);
        // console.log(answers.qty);
        // quit, else run purchase
          if (ansProd.product.toUpperCase() == "Q") {
            connection.end();
          } else {
            inquirer.prompt([{
                name: "qty",
                message: "How many would you like to buy?"
            }]).then(function(ansQty) {
               console.log(ansProd.product);
              // console.log(ansQty.qty);
              connection.query('SELECT * FROM products WHERE ?', {ProductName: ansProd.product}, function(err, res) {
                if (err) throw err;
             
                // if StockQuantity > answers.qty
                  // console.log("Qty: " + res[0].StockQuantity);
                  if (res[0].StockQuantity > ansQty.qty) {
                    // place order: calculate total cost of order
                    var cost = res[0].Price * ansQty.qty
                    console.log("-----------------------------------");
                    console.log("Your order has been placed! \nThe total cost is $" + cost.toFixed(2) + "\nThank you!")
                    // update StockQuantity amount
                      var newQty = res[0].StockQuantity - ansQty.qty
                      connection.query("UPDATE products SET ? WHERE ?", [{
                          StockQuantity: newQty
                      }, {
                          ProductName: ansProd.product
                      }], function(err, res) {});
                    // else "Insufficient quantity.  Please request a quantity less than " + StockQuantity  
                  } else {
                    console.log("-----------------------------------");
                    console.log("Sorry, we do not have enough in stock. \nWe only have " + res[0].StockQuantity + " units of " + ansProd.product + ". \nPlease retry your order. \nThank you!")
                  }
                   
              })
              
              
            })
          }
    })
   
        //INITIALIZES THE VARIABLE newGuy TO BE A Programmer OBJECT WHICH WILL TAKE IN ALL OF THE USER'S ANSWERS TO THE QUESTIONS ABOVE
        // var custBuy = new Programmer(answers.name, answers.position, answers.age, answers.language);
        //printInfo METHOD IS RUN TO SHOW THAT THE newGuy OBJECT WAS SUCCESSFULLY CREATED AND FILLED
        // newGuy.printInfo();
}); // connection.query('SELECT * FROM products', 


// ++++++++++++++ CODE CLEANUP ++++++++++++
connection.connect(function(err) {
    if (err) throw err;
    // runSearch();
    displayProdTable();
    dispBuyPrompt();
})

var buyPrompt = function() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What Product would you like to buy? [Quit with Q]",
        choices: [
            "Q", 
            "q", 
            "", 
            "Search for a specific song", 
            "Find artists with a top song and top album in the same year"
        ]
    }).then(function(answer) {
        switch(answer) {
            case 'Q':
                connection.end();
            break;

            case 'q':
                connection.end();
            break;

            case '':
                // connection.end();
            break;

            default:
              // qtyPrompt();
        }
    })
}


var displayProdTable = function() {
    connection.query('SELECT * FROM products', 
      function(err, res) {
        if (err) throw err;
        console.log("Item \t Product \t Department \t Price \t Stock");
        console.log("-----------------------------------");
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].ItemID + "   " + res[i].ProductName + " \t " + res[i].DepartmentName + " \t " + res[i].Price + " \t " + res[i].StockQuantity);
        }
        console.log("-----------------------------------");
    })
}
      // connection.end();
// var prodSearch = function() {
//     inquirer.prompt({
//         name: "prod",
//         type: "input",
//         message: "What song would you like to look for?"
//     }).then(function(answer) {
//         console.log(answer.song)
//         connection.query('SELECT * FROM top5000 WHERE ?', {song: answer.song}, function(err, res) {
//             console.log("Position: " + res[0].position + " || Song: " + res[0].song + " || Artist: " + res[0].artist + " || Year: " + res[0].year);
//             runSearch();
//         })
//     })
// };

// connection.query('SELECT * FROM products WHERE genre=?', ['Dance'], function(err, res) {
//     for (var i = 0; i < res.length; i++) {
//         console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
//     }
// })


// var start = function() {
//     inquirer.prompt({
//         name: "buy",
//         type: "list",
//         message: "What would you like to buy?",
//         choices: [
//         for (var i = 0; i < res.length; i++) {
//             res[i].ProductName;
//             }]
//     }).then(function(answer) {
//         if (answer.postOrBid.toUpperCase() == "POST") {
//             postAuction();
//         } else {
//             bidAuction();
//         }
//     })
// }