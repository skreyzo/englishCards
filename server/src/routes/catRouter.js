const { Router } = require('express');
const { Category, Card } = require('../../db/models');

const router = Router();

router.route('/').get(async (req, res) => {
  // гет запрос
  try {
    const categoriesAll = await Category.findAll();
    res.json(categoriesAll);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.route('/:id').get(async (req, res) => {
    // гет запрос на карточки по категориям
    try {
        const {id} = req.params
      const categoriyOne = await Card.findAll({ where: { categoryId: id } });
      res.json(categoriyOne);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
