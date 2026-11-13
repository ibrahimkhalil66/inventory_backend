const db = require("../db/queries");

async function getAllItems(req, res) {
  try {
    const items = await db.getAllItems();

    if (!items) throw new Error();

    res.render("main.ejs", { items: items });
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

    if (!item) {
      return res.render("main.ejs", { items: [] });
    }

    res.render("main.ejs", { items: [item] });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function newItem(req,res) {

  res.render("newItem.ejs")
}
async function postNewItem(req, res) {
  try {
    const { newItem } = req.body;

    if (!newItem) throw new Error();

    const result = await db.postNewItem(newItem);

    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function deleteItem(req, res) {
  try {
    const { id } = req.body;

    if (!id) throw new Error();

    const result = await db.deleteItem(id);

    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
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
};
