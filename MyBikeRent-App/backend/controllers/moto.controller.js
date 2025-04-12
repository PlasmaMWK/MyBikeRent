// backend/controllers/moto.controller.js
const MotoModel = require('../models/moto.model');

exports.findAll = async (req, res) => {
  try {
    const motos = await MotoModel.getAllMotos();
    res.status(200).json(motos);
  } catch (err) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des motos.",
      error: err.message
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const moto = await MotoModel.getMotoById(req.params.id);
    if (!moto) {
      return res.status(404).json({ message: `Moto avec l'ID ${req.params.id} non trouvée.` });
    }
    res.status(200).json(moto);
  } catch (err) {
    res.status(500).json({
      message: `Erreur lors de la récupération de la moto avec l'ID ${req.params.id}.`,
      error: err.message
    });
  }
};