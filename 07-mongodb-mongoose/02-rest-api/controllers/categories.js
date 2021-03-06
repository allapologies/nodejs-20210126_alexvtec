const categoryModel = require('../models/Category');
const mappers = require('./mappers');

module.exports.categoryList = async function categoryList(ctx) {
  try {
    const categories = await categoryModel.find({});
    ctx.body = {
      categories: mappers.categoriesFromOutput(categories),
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      message: e.message,
    };
  }
};
