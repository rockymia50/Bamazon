CREATE DATABASE bamazon;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL ,
  stock_quantity INT (1000) NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name,department_name, price)
VALUES ("Jordan 11", "sneakers", 100.00, 200),
        ("bally loafer","shoes",200.00, 250),
        ("Geox","recreation", 750.00,75, 356),
        ("Curry 6","sneakers", 150.00, 286),
        ("used Iphone 6","electronics", 150.00,456),
        ("Canoe","recreation", 150.00,10),
        ("speaker","electronics", 150.00,276),
        ("Canoe","recreation", 150.00,500),
        ("dining chair","furniture", 150.00,400),
        ("Iphone","electronics", 150.00,120),
        ("coffee table","furniture", 150.00,100),
        ("bunny","toys", 150.00,1),


