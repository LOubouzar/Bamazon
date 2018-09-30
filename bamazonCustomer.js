var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    // displayAll();
    start();
});


function start() {
    displayAll();
    inquirer
        .prompt([
            {
                name: "selectID",
                type: "input",
                message: "Please list the ID of the item you would like to buy",
            },
            {
                name: "amount",
                type: "input",
                message: "How much would you like to buy?",
            }
        ])
        .then(function(answer) {
            if (answer.selectID)
                console.log(answer.selectID);
            else{
                console.log(answer.amount);
            }
        })
};


//display all items listed in the table products
function displayAll() {
    console.log("====================================================================");
    console.log("Thank you for browsing Bamazon!");
    console.log("These are all of our products for sale:\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_ID +" || "+ "Product: " + res[i].product_name+" || "+"Department: " + res[i].department_name+" || "+"Price: " + res[i].price+" || "+"Quanity Left: " + res[i].stock_quantity);
        }
        // connection.end();
    });
};

