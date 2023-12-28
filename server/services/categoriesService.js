const pool = require('../db/database');

const getAllCategories = async (req, res) => {
    try {
        const allCategories = await pool.query("SELECT * FROM categories");
        res.json(allCategories.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};

const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ error: 'Please provide a category name' });
        }

        const newCategory = await pool.query(
            "INSERT INTO categories (name) VALUES($1) RETURNING *",
            [name]
        );
        res.status(201).json(newCategory.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ error: 'Please provide a category name' });
        }

        const updateCategory = await pool.query(
            "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
            [name, id]
        );

        if (updateCategory.rows.length === 0) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(updateCategory.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteCategory = await pool.query("DELETE FROM categories WHERE id = $1 RETURNING *", [id]);
        if (deleteCategory.rowCount === 0) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json({ message: 'Category was successfully deleted!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };