
const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});



// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

//make a variable to hold customer order
var customerOrder =[]; 

//start function that prompts that welcomes the user to bamazon and prompts them to see the items for sale
function start() {
    console.log("Welcome to BAMAZON.");
    console.log("Below you will find all of our offerings for sale ")
        // once you have the items, prompt the user for which they'd like to buy
        inquirer.prompt([
            {
              name: "Items for sale",
              type: "list",
              message: "Which Item would you like to buy?",
              choices: function readProducts() {
                console.log("Selecting all of Products...\n");
                connection.query("SELECT id, Name, Department, Price FROM Products", function (err, res) {
                    if (err) throw err;
                    // Log all results of the SELECT statement
                    console.log(res);
                   
                });
            }
            },
          ]).then(function(answer) {
            var query = "SELECT id, Name, Price FROM Products WHERE ?";
            connection.query(query, { id: answer.id }, function(err, res) {
              for (var i = 0; i < res.length; i++) {
                console.log("id: " + res[i].id + " || Name: " + res[i].Name + " || Price: $" + res[i].Price);
              }
              sale();
            });
          });

};



function sale(){
    console.log("You would like to purchase item number :" + res[i].id + "at" + res[i].Price + "your total is" + res[i].Price);
}