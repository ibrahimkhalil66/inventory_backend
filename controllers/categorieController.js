const db = require("../db/queries");

async function getAllCategories(req, res) {
  try {

    const categories = await db.getAllCategories();

    if (!categories) throw new Error();
    
    for (const category of categories) {
      category.items_count = await db.getItemsCountByCategory(category.id);

    }

    res.render("categories.ejs", { categories: categories });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function getCategoryById(req, res) {
  try {
      const { id } = req.query;
  
      if (!id) {
        return res.render("categories.ejs", { categories: [] });
      }

      const category = await db.getCategoryById(id);

      category.items_count = await db.getItemsCountByCategory(id);

      if (!category) {
        return res.render("categories.ejs", { categories: [] });
      }
  
      res.render("categories.ejs", { categories: [category]});
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
}

async function NewcategoryPage(req, res) {
    res.render("newCategory.ejs")
}

async function postNewcategory(req, res) {
  try {
    const newCategory = req.body;

    if (!newCategory) throw new Error("Error in Information insert");

    const categories = await db.getAllCategories()

    const isExists = categories.some(
      (c) => 
      c.name.trim().toLowerCase() === newCategory.name.trim().toLowerCase()
    );

    if(isExists) {
      return res.render("newCategory.ejs", {
        isExists: true,
        error : "The Category name is already exists"
      })
    }
    const result = await db.postNewcategory(newCategory);

    res.redirect("/inventory/categories")
  } catch (error) {
    console.log(error.code)
    res.status(500).send(error.message);
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    if (!id) throw new Error();


    await db.deleteCategory(id);
    res.redirect("/inventory/categories");
  } catch (error) {
    if (error.code === "23503" || error.code === "23001") {
      const categories = await db.getAllCategories();
      for (const category of categories) {
        category.items_count = await db.getItemsCountByCategory(category.id);
      }

      return res.render("categories.ejs", {
        categories,
        error: "Cannot delete this category because it still contains items.",
      });
    }
  }
}

async function editCategoryPage(req, res) {

    const { id } = req.params;

    const category = await db.getCategoryById(id);

    category.items_count = await db.getItemsCountByCategory(id);

    res.render("editCategory.ejs", {category})
}

async function editCategory(req, res) {
  try {
    const { id } = req.params;
    const category = {id , ...req.body};
    if (!category) throw new Error("Category not Found");

    const categories = await db.getAllCategories()
    const isExists = categories.some(
      (c) => 
        c.id !== Number(category.id) &&
        c.name.trim().toLowerCase() === category.name.trim().toLowerCase()
    );

    if(isExists) {
      const originalCategory = await db.getCategoryById(category.id)
      originalCategory.items_count = await db.getItemsCountByCategory(id);

      return res.render("editCategory.ejs", {
        category: originalCategory,
        isExists: true,
        error: `The category "${category.name}" already exists`
      })
    }
    const result = await db.editCategory(category);

    res.redirect("/inventory/categories")
  } catch (error) {
    res.status(500).send(error.message);
  }
}


module.exports = { getAllCategories,NewcategoryPage,  getCategoryById, deleteCategory, postNewcategory, editCategory, editCategoryPage}