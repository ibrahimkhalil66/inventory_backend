
const db = require("../db/queries");


async function getAllItems(req,res) {
    try {
        const items = await db.getAllItems;

        if(!items) throw new Error;

        res.render("main.ejs", {items: items});
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}


async function getItemById(req,res) {
    const { id } = req.params;

    const item = await db.getItemById(id);

    if(!item) throw new Error;

    res.send(item)
}