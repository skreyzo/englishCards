const { Router } = require('express');
const { Category, Card, Progress } = require('../../db/models');
const { Op } = require('sequelize');

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
    const { id } = req.params;
    const { userId } = req.query;

    // Найти все карточки для данной категории
    let categoriyOne = await Card.findAll({ where: { categoryId: id } });

    // Если userId передан, фильтруем карточки
    if (userId) {
      const userProgress = await Progress.findAll({ where: { userId } });
      const progressIds = userProgress.map(progress => progress.cardId);
      categoriyOne = categoriyOne.filter(card => !progressIds.includes(card.id));
    }

    res.json(categoriyOne);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;