const pool = require("./pool");

{
  /* Items Queries */
}

{
  /* return all items */
}
async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");

  return rows;
}

{
  /* return item by ID */
}
async function getItemById(id) {
  const { rows } = await pool.query(
    `SELECT * FROM items
         WHERE id = $1
        `,
    [id],
  );

  return rows[0] || null;
}

{
  /* Insert new item */
}
async function postNewItem(item) {
  const { name, description, price, stock_quantity, category_id } = item;
  const { rows } = await pool.query(
    `INSERT INTO items (name, description, price, stock_quantity, category_id) 
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
    [name, description, price, stock_quantity, category_id],
  );

  return rows[0];
}

{
  /* Delete item by ID */
}
async function deleteItem(id) {
  const { rows } = await pool.query(
    `DELETE FROM items 
         WHERE id = $1
         RETURNING *`,
    [id],
  );

  return rows[0] || null;
}

{
  /* Edit item */
}

async function editItem(item) {
  const { id, name, description, price, stock_quantity, category_id } = item;

  const { rows } = await pool.query(
    `UPDATE items 
        SET name = COALESCE($1, name),
        description = COALESCE($2, description),
        price = COALESCE($3, price),
        stock_quantity = COALESCE($4, stock_quantity),
        category_id = COALESCE($5, category_id)
        
        WHERE id = $6
        RETURNING *`,
    [name, description, price, stock_quantity, category_id, id],
  );

  return rows[0] || null;
}

{
  /* Category Queries */
}

{
  /* return all Categories */
}
async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");

  return rows;
}

{
  /* return Category by ID */
}
async function getCategoryById(id) {
  const { rows } = await pool.query(
    `SELECT * FROM categories
         WHERE id = $1
        `,
    [id],
  );

  return rows[0] || null;
}

{
  /* Insert new category */
}
async function postNewcategory(category) {
  const { name, description } = category;
  const { rows } = await pool.query(
    `INSERT INTO categories (name, description) 
         VALUES ($1, $2)
         RETURNING *`,
    [name, description],
  );

  return rows[0];
}

{
  /* Delete Category by ID */
}
async function deleteCategory(id) {
  const { rows } = await pool.query(
    `DELETE FROM categories 
         WHERE id = $1
         RETURNING *`,
    [id],
  );

  return rows[0] || null;
}

{
  /* Edit Category */
}

async function editCategory(category) {
  const { id, name, description } = category;

  const { rows } = await pool.query(
    `UPDATE categories 
        SET name = COALESCE($1, name),
        description = COALESCE($2, description),
        
        WHERE id = $3
        RETURNING *`,
    [name, description, id],
  );

  return rows[0] || null;
}

async function getItemsCountByCategory(categoryId) {
    const { rows } = await pool.query(
        `SELECT COUNT(*) FROM items WHERE category_id = $1`, 
        [categoryId]
    );
    // COUNT ترجع الرقم كنص، لذا نحوله إلى رقم صحيح
    return parseInt(rows[0].count, 10);
}

module.exports = {
  getAllItems,
  getItemById,
  postNewItem,
  deleteItem,
  editItem,
  getAllCategories,
  getCategoryById,
  postNewcategory,
  deleteCategory,
  editCategory,
  getItemsCountByCategory
};
