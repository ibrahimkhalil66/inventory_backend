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

    if (!newItem) throw new Error();

    const result = await db.postNewItem(newItem);

    res.redirect("/inventory/items")
  } catch (error) {
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
   res.render("edit.ejs");
}

async function editItem(req, res) {
  try {
    const { item } = req.body;

    if (!item) throw new Error();

    const result = await db.editItem(item);

    res.send(result);
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
