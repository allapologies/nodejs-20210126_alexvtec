function categoriesFromOutput(categories = []) {
  return categories.map(({_id, title, subcategories}) => ({
    id: _id,
    title,
    subcategories: categoriesFromOutput(subcategories),
  }));
}

module.exports.categoriesFromOutput = categoriesFromOutput;

function productFromOutput(product = {}) {
  return {
    id: product._id,
    title: product.title,
    description: product.description,
    category: product.category,
    subcategory: product.subcategory,
    images: product.images,
    price: product.price,
  };
}

module.exports.productFromOutput = productFromOutput;

module.exports.productsFromOutput = function(products = []) {
  return products.map(productFromOutput);
};
