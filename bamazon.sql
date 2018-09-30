DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_ID INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT(20) NULL,
  PRIMARY KEY (item_ID)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spider Plant", "House Plant", 8.95, 100), 
("Philodendron", "House Plant", 11.25, 120), 
("Jade Plant", "House Plant", 14.75, 75),
("Sequoia", "Tree", 924.99, 20),
("Birch", "Tree", 95.99, 45),
("Willow", "Tree", 49.95, 35),
("Hyacinth", "Flower", 5.95, 116),
("Hydrangea", "Flower", 7.85, 110),
("Dahlia", "Flower", 10.99, 65),
("Amaryllis", "Flower", 12.95, 88);