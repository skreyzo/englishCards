const { Router } = require('express');
const { Card } = require('../../db/models');
// const verifyAccessToken = require('../middlewares/verifyAccessToken');

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    // гет запрос на все карточки
    try {
      const cardsAll = await Card.findAll();
      res.json(cardsAll);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  })

  // .post(verifyAccessToken, async (req, res) => {
  //   // создание карточки с добавлением автора 
  //   try {
  //     await Card.create({
  //       ...req.body,
  //       userId: res.locals.user.id,
  //     });
  //     res.sendStatus(200);
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).send('Internal server error');
  //   }
  // });

  .post(async (req, res) => {
    // пост запрос создание
    const { rusWord, engWord, categoryId, userId } = req.body;
    const newCard = await Card.create({ rusWord, engWord, categoryId, userId });
    res.json(newCard);
  });

router
  .route('/:id')
  .delete(async (req, res) => {
    // удаление
    try {
      const { id } = req.params;
      const result = await Card.destroy({ where: { id } });
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  })
  .patch(async (req, res) => {
    // внести изменения в карточку
    try {
      const { id } = req.params;
      const cardEdit = await Card.findByPk(id);
      if (!cardEdit) {
        return res.status(404).json({ message: 'Task not found' });
      }
      const { rusWord, engWord, categoryId, userId } = req.body;
      const newData = await cardEdit.update({ rusWord, engWord, categoryId, userId });
      res.json(newData);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error });
    }
  });

module.exports = router;
