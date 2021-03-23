const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tag
  Tag.findALl({
    attributes: {'tag_name'}
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500),json(err);
  });

  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    attributes: {'tag_name'},
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      attributes:['id', 'category_id', 'price', 'stock', 'product_name']
    },
    {
      model: Category,
      attributes: ['category_name'],
      include: {
        model: Product,
        attributes: ['productData']
      }
    },
    {
      model: Product,
      attributes: ['productDATA'],
      THROUGH: product_tag,
      as: 'productTagDAta'
    }
    ]
  })
  .then(dbTagData => {
    if (!dbTagData){
      res.status(404).json({message: 'No tag found with this id'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name 
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if(!dbTagData[0]){
      res.status(404).json({message:'No tag found with this id'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
