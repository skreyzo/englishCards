const { Router } = require('express');
const { Card, Progress, User } = require('../../db/models');

const router = Router();

router.get('/:userId/cards', async (req, res) => {
    try {
      const { userId } = req.params;
      // Получение всех карточек, которые пользователь изучал как студент
      const studiedCards = await Card.findAll({
        include: [
          {
            model: User,
            as: 'studentCard', // Алис пользователя в связи belongsToMany
            where: { id: userId }, // Фильтр по userId в связи
            through: {
              model: Progress, // Используемая промежуточная таблица
              attributes: [], // Не возвращаем дополнительные поля из Progress
            },
          },
        ],
      });

      res.json(studiedCards);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


module.exports = router;
