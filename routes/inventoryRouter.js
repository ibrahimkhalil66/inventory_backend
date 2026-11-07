const { Router } = require("express");


const inventoryRouter = Router();

{/* items */}
inventoryRouter.get("/items",);
inventoryRouter.get("/item/:id",);
inventoryRouter.post("/newItem",);
inventoryRouter.delete("/item/delete/:id",);
inventoryRouter.update("/item/edit/:id",);
{/* Categories */}
inventoryRouter.get("/categories",)
inventoryRouter.get("/category/:id",);
inventoryRouter.post("/category/new",);
inventoryRouter.delete("/category/delete/:id",);
inventoryRouter.update("/category/edit/:id",);


module.exports = { inventoryRouter };
