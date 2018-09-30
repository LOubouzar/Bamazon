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
    displayAll();
});

//display all items listed in the table products
function displayAll() {
    console.log("========================================================================================");
    console.log("Thank you for browsing Bamazon!");
    console.log("These are all of our products for sale:\n");
    // console.log("========================================================================================");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_ID + " || " + "Product: " + res[i].product_name + " || " + "Department: " + res[i].department_name + " || " + "Price: " + res[i].price + " || " + "Quanity Left: " + res[i].stock_quantity);
        }
        // connection.end();
    });
    start();
    function start() {
        //asks user for for which item they would like to buy

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
            .then(function (answer) {
                connection.query(
                    `SELECT * FROM PRODUCTS WHERE ${answer.selectID}`,
                    function (err, res) {
                        if (err) throw err;
//Having issues burying down through the results object and linking the ${answer.selectID} to the object. It is always pulling up the 1st object in the the response array.

                        // console.log("Res:",res);
                        // console.log(answer.selectID);
                        // var chosenproduct;
                        // for (var i = 0; i < res.length; i++){
                        //     var chosenprodcut = res[i];
                        // }
                        var stock = res[0].stock_quantity;
                        console.log("Stock",stock);
                        var quantityBought = answer.amount;
                        console.log("QuantityBought", quantityBought);
                        
                        if (stock >= quantityBought) {
                            var remainderStock = stock - quantityBought;
                            var purchase = res[0].product_name;
                            var cost = res[0].price * quantityBought;
                            console.log("You are purchasing", quantityBought, "of the", purchase, "(s). Your total purchase cost is $", cost, ".")
                            console.log("Thank you for shopping at Bamazon!")
                            connection.query(
                                `UPDATE product SET ? WHERE ?`, [
                                    { stock_quantity: remainderStock },
                                    { item_ID: answer.selectID }
                                ],
                            )
                            displayAll();
                        }
                        else {
                            console.log("========================================================================================");
                            console.log("I'm sorry there isn't enough of these left to purchase.")
                            console.log("Please browse the rest of our stock and change the amount you would like to purchase.")
                            console.log("========================================================================================");
                            displayAll();
                        };
                    });
                        
            });
    }
};

