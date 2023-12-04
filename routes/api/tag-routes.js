const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
     // find all tags
     // be sure to include its associated Product data
    const tags = await Tag.findAll({
      include: [{ 
        model: Product, 
        through: ProductTag 
      }],
    });
    res.json(tags);
  } catch (err) { 
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    const tag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product, 
        through: ProductTag 
      }],
    });
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', (req, res) => {
  try { 
    // create a new tag
    const newTag = await Tag.create(req.body);
    res.json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    // Check if any rows were affected
    if (updatedTag[0] === 0) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json({ message: 'Tag updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });
    // Check if any rows were affected
    if (deletedTag === 0) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }
    res.json({ message: 'Tag deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: 'Server error'})
  }
  // delete on tag by its `id` value
});

module.exports = router;
