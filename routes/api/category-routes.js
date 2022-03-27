const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        }, 
      ],
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const catData = await Category.update(req.body, {
      where: {id: req.params.id },
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
