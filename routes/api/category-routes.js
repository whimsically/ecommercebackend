const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    //query database to find all categories
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
 try {
    //query database to find category of the specified ID
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    //checks if category was found. if not, display 404 and a message
    if (!categoryData) {
      res.status(404).json({ message: "No category found!" });
      return;
    }

    //success
    res.status(200).json(categoryData);

 } catch (err) {
  res.status(500).json(err);
 }
 });

router.post('/', async (req, res) => {
  //creates new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name
    });

    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id',async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!categoryData) {
      res.status(404).json({ message: 'No product with that ID found!' });
      return;
    }

    res.status(200).json(categoryData);

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
