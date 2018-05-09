DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  stock_quantity INT(3),
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
('Pepsi 2l', 'Beverages', 1.59, 50),
('Arizona Green Tea ', 'Beverages', 1.29, 80),
('Quaker Chewy Granola Bars', 'Snacks', 2.98, 75),
('Oreo Cookies, Family Size', 'Snacks', 3.69, 50),
('Heinz Tomato Ketchup', 'Condiments', 6.98, 40),
('Morton Iodized Salt', 'Condiments', 0.98, 100),
('Hershey Milk Chocolate Candy', 'Chocolate', 2.00, 35),
('Reeses Peanut Butter Cups', 'Chocolate', 8.98, 50),
('Honey Nut Cheerios', 'Breakfast', 3.64 , 60),
('Jif Creamy Peanut Butter', 'Breakfast', 2.50, 30);

