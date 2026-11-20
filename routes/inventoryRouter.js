const { Router } = require("express");

const inventoryRouter = Router();
const itemsController = require("../controllers/itemsController");
const categoriesController = require("../controllers/categorieController");

{
  /* items */
}
inventoryRouter.get("/items", itemsController.getAllItems);
inventoryRouter.get("/item/search", itemsController.getItemById);
inventoryRouter.get("/newItem", itemsController.newItem);
inventoryRouter.post("/newItem", itemsController.postNewItem);
inventoryRouter.post("/item/delete/:id", itemsController.deleteItem);
inventoryRouter.post("/item/edit/:id/", itemsController.editItem);
inventoryRouter.get("/item/edit/:id", itemsController.editItemPage);
{
  /* Categories */
}
inventoryRouter.get("/categories", categoriesController.getAllCategories);
inventoryRouter.get("/category/search", categoriesController.getCategoryById);
inventoryRouter.post("/newCategory", categoriesController.postNewcategory);
inventoryRouter.get("/newCategory", categoriesController.NewcategoryPage);
inventoryRouter.post("/category/delete/:id", categoriesController.deleteCategory,);
inventoryRouter.post("/category/edit/:id", categoriesController.editCategory);
inventoryRouter.get("/category/edit/:id", categoriesController.editCategoryPage);

module.exports = { inventoryRouter };
