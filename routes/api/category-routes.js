const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    // be sure to include its associated Products
    const categories = await Category.findAll({
      include: [{
        model: Product
      }],
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    // be sure to include its associated Products
    const category = await Category.findbyPk(req.params.id, {
      include: [{
        model: Product 
      }],
    });
    if (!category) {
      res.status(404).json({ error: 'Category not found'});
      return;
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new category
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async(req, res) => {
  try { 
    // update a category by its `id` value
    const updatedCategory = await Category.update(req.body, {
      where: { 
        id: req.params.id
      },
    });
    if (updatedCategory[0] === 0) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json({ message: 'Cateogry updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // check if rows were affected
    if (deletedCategory === 0) {
      res.status(404).json({ error: 'Catergory not found' });
      return;
    }
    res.json({ message: 'Category deleted successfuly' });
  } catch (err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
