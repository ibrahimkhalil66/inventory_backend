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
inventoryRouter.delete("/item/delete/:id", itemsController.deleteItem);
inventoryRouter.put("/item/edit/:id", itemsController.editItem);
{
  /* Categories */
}
inventoryRouter.get("/categories", categoriesController.getAllCategories);
inventoryRouter.get("/category/search", categoriesController.getCategoryById);
inventoryRouter.post("/newCategory", categoriesController.postNewcategory);
inventoryRouter.delete("/category/delete/:id", categoriesController.deleteCategory,);
inventoryRouter.put("/category/edit/:id", categoriesController.editCategory);

module.exports = { inventoryRouter };
