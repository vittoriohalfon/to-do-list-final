const express = require('express');
const router = express.Router();
const categoriesService = require('../services/categoriesService');

// List all categories
router.get('/', categoriesService.getAllCategories);

// Create a new category
router.post('/', categoriesService.createCategory);

// Update an existing category
router.put('/:id', categoriesService.updateCategory);

// Delete a category
router.delete('/:id', categoriesService.deleteCategory);

module.exports = router;