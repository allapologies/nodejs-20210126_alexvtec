const objectID = require('mongodb').ObjectID;

const productModel = require('../models/Product');
const mappers = require('./mappers');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.request.query;
  if (!subcategory) {
    return next();
  }
  try {
    const products = await productModel.find({subcategory});
    ctx.body = {
      products: mappers.productsFromOutput(products),
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      message: e.message,
    };
  }
};

module.exports.productList = async function productList(ctx) {
  try {
    const products = await productModel.find({});
    ctx.body = {
      products: mappers.productsFromOutput(products),
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      message: e.message,
    };
  }
};

module.exports.productById = async function productById(ctx, next) {
  const {id} = ctx.params;
  if (!objectID.isValid(id)) {
    ctx.status = 400;
    return next();
  }
  try {
    const product = await productModel.findOne({_id: id});
    // handle empty entries
    if (!product) {
      ctx.status = 404;
      return next();
    }
    ctx.body = {
      product: mappers.productFromOutput(product),
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      message: e.message,
    };
  }
};

