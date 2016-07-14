CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  ItemID INT NOT NULL AUTO_INCREMENT,
  ProductName VARCHAR(100) NULL,
  DepartmentName VARCHAR(100) NULL,
  Price DECIMAL(10,2) NULL,
  StockQuantity INT NOT NULL,
  PRIMARY KEY (ItemID)
);

select * from products;