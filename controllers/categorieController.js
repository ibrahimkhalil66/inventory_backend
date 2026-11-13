const db = require("../db/queries");



async function getAllCategories(req, res) {
  try {
    const categories = await db.getAllCategories();

    if (!categories) throw new Error();

    const categoriesWithCount = await Promise.all(
            categories.map(async (category) => {
                const count = await db.getItemsCountByCategory(category.id);
                return { ...category, items_count: count }; 
            })
        );

    res.render("categories.ejs", { categories: categoriesWithCount });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function getCategoryById(req, res) {
  try {
    const { id } = req.params;

    const category = await db.getCategoryById(id);

    if (!category) throw new Error();

    const categoriesWithCount = await Promise.all(
            categories.map(async (category) => {
                const count = await db.getItemsCountByCategory(category.id);
                return { ...category, items_count: count }; 
            })
        );

    res.send(category);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function postNewcategory(req, res) {
  try {
    const { newCategory } = req.body;

    if (!newCategory) throw new Error();

    const result = await db.postNewItem(newCategory);

    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.body;

    if (!id) throw new Error();

    const result = await db.deleteCategory(id);

    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function editCategory(req, res) {
  try {
    const { category } = req.body;

    if (!category) throw new Error();

    const result = await db.editItem(category);

    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}


module.exports = { getAllCategories, getCategoryById, deleteCategory, postNewcategory, editCategory}