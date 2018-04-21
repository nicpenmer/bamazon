
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



//start function that prompts that welcomes the user to bamazon and prompts them to see the items for sale
function start() {
    console.log("Welcome to BAMAZON.");
    console.log("Below you will find all of our offerings for sale ")
    // once you have the items, prompt the user for which they'd like to buy
    var query = "SELECT id, Name, Price FROM Products WHERE ?";
    //connection to data base to display id, name and price of items for sale
    connection.query(query, { id: answer.id }, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("id: " + res[i].id + " || Name: " + res[i].Name + " || Price: $" + res[i].Price);
        }
        getId();
    });
};

//function to promput user for ID using inquirer 
function getId() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "id",
                    type: "input",
                    message: "Select the item's ID Number to Purchase.",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function answer(err, res) {
                //print response
                console.log("You would like to purchase" + res[i].Quantity + " of item number :" + res[i].id + "at $" + res[i].Price + "your total is $" + (res[i].Quantity * res[i].Price));
                connection.query(
                    "UPDATE Products SET ? WHERE ?",
                    [
                        {
                            id: answer.id
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        if (results.length > 0) {
                            if (results[0].Quantity < product.Quantity) {
                                console.log("Sorry but we are low on that product");
                                console.log("Please Select another item to purchase.")
                                start();
                            } else {
                                console.log("Your Purchase is ready.");
                                console.log("Thank you. Have a nice one.");
                                start();
                            }
                        }
                    }
                );
                console.log("Sorry, we are unable to fill that request at this time. perhaps next time.");
                start();

            });
    });
};
//update quantity in databadse
function updateProducts() {
    connection.query(
        'UPDATE Products SET Quantity = Quantity - ?, ',
        function (err) {
            if (err) throw err;
            start();
        }
    );
};

//call the function to update the DB
updateProducts();

