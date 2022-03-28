const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

    if (!catData) {
      res.status(404).json({ message: "No category found with the id "});
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const catData = await Category.update(req.body, {
      where: {id: req.params.id },
    });

    if (!catData) {
      res.status(404).json({ message: "No category found with the stated id"});
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catDel = await Category.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(catDel);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
