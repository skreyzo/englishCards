// const { Router } = require('express');
// const { Card, Progress } = require('../../db/models');
// const { Op } = require('sequelize');

// const router = Router();

// router.route('/:id').get(async (req, res) => {
//   //! гет запрос на карточки по категориям
//   try {
//     const { id } = req.params;
//     const { userId } = req.query;

//     //! Проверка, что userId передан
//     if (!userId) {
//       return res.status(400).json({ message: 'UserId is required' });
//     }

//     //! Запросить прогрессы юзера из модели Progress
//     const userProgress = await Progress.findAll({ where: { userId } });

//     //! Размапать результат, чтобы получился массив из cardId, который будет называться progressIds
//     const progressIds = userProgress.map(progress => progress.cardId);

//     //! Найти все карточки для данной категории, исключая те, которые есть в массиве progressIds
//     const categoriyOne = await Card.findAll({
//       where: {
//         categoryId: id,
//         id: { [Op.notIn]: progressIds }
//       }
//     });

//     res.json(categoriyOne);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// module.exports = router;