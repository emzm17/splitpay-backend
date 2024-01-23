const settlementService = require('../services/settlementService');

const settlement = async (req, res) => {
  const groupId = req.params.id;
  try {
    const result = await settlementService.settlement(groupId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

module.exports = {
  settlement,
};