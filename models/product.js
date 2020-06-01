const fs = require('fs');
const path = require('path');

const { getFile } = require('./utils');

const getProductsFromFile = (callback) => {
  fs.readFile(getFile('products.json'), (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      // If there is no error then the file exists and we can read the
      // products
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save = () => {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      // Persists the products to the file
      fs.writeFile(productsFile, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  };

  static fetchAll = (callback) => {
    getProductsFromFile(callback);
  };

  static findById = (id, callback) => {
    getProductsFromFile((products) => {
      callback(products.find((product) => product.id === id));
    });
  };
};
