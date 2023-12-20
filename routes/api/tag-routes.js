const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, ProductTag }]
    });
    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    //query database to find tag of the specified ID
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, ProductTag }]
    });

    //checks if tag was found. if not, display 404 and a message
    if (!tagData) {
      res.status(404).json({ message: "No tag found!" });
      return;
    }

    //success
    res.status(200).json(tagData);

 } catch (err) {
  res.status(500).json(err);
 }
 });

 router.post('/', async (req, res) => {
  //creates new tag
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name
    });

    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id',async (req, res) => {
  // update a tag by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(tagData);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    //tag isn't found
    if (!tagData) {
      res.status(404).json({ message: 'No product with that ID found!' });
      return;
    }

    //success
    res.status(200).json(tagData);

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
