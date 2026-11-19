const db = require("../db/queries");
async function getAllItems(req, res) {
  try {
    const items = await db.getAllItems();
    const categories = await db.getAllCategories()
    if (!items) throw new Error();

    res.render("main.ejs", { items: items, categories: categories});
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function getItemById(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.render("main.ejs", { items: [] });
    }

    const item = await db.getItemById(id);
    const categories = await db.getAllCategories()

    if (!item) {
      return res.render("main.ejs", { items: [] });
    }

    res.render("main.ejs", { items: [item], categories});
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function newItem(req, res) {
  try {
    const categories = await db.getAllCategories();
    res.render("newItem.ejs", { categories: categories });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function postNewItem(req, res) {
  try {
    const newItem = req.body;

    if(!newItem) throw new Error;

    const items = await db.getAllItems();
    const isExists = items.some(
      (i) => i.name.trim().toLowerCase() === newItem.name.trim().toLowerCase()
    );

    if (isExists) {
      const categories = await db.getAllCategories();
      return res.render("newItem.ejs", {
        categories,
        isExists: true,
        error: `The item "${newItem.name}" already exists.`,
      });
    }

    const result = await db.postNewItem(newItem);
    res.redirect("/inventory/items");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function deleteItem(req, res) {
  try {
    const { id } = req.params;

    if (!id) throw new Error();

    await db.deleteItem(id);

    res.redirect("/inventory/items");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function editItemPage(req,res) {
  const { id } = req.params
  
  const item = await db.getItemById(id); 
  const categories = await db.getAllCategories();
   res.render("edit.ejs", {item, categories });
}

async function editItem(req, res) {
  try {
    const { id } = req.params;
    const item  = {id ,...req.body};


    if (!item) throw new Error();
    const items = await db.getAllItems();
    const isExists = items.some(
      (i) =>
        i.id !== Number(item.id) &&
        i.name.trim().toLowerCase() === item.name.trim().toLowerCase()
    );

    if (isExists) {
      const categories = await db.getAllCategories();
      const originalItem = await db.getItemById(item.id);
      return res.render("edit.ejs", {
        item: originalItem ,
        categories,
        isExists: true,
        error: `The item "${item.name}" already exists.`,
      });
    }

    const result = await db.editItem(item);
    res.redirect("/inventory/items");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getAllItems,
  getItemById,
  newItem,
  postNewItem,
  deleteItem,
  editItem,
  editItemPage
};
