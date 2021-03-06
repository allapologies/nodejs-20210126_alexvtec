const categoryModel = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx) {
  try {
    const categories = await categoryModel.find({});
    ctx.body = {categories};
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      message: e.message,
    };
  }
};
