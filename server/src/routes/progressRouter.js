const { Router } = require('express');
const { Progress } = require('../../db/models');

const router = Router();

router.post('/', async (req, res) => {
  const { cardId, userId } = req.body;

  try {
    let progress = await Progress.findOne({ where: { cardId, userId } });

    if (!progress) {
      await Progress.create({ cardId, userId });
    }

    res.status(200).json({ message: 'Progress updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating progress', error });
  }
});

module.exports = router;