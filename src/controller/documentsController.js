const { Document, PrintConfig } = require('../models');
const pdfService = require('../services/pdfServices');
const path = require('path');

exports.generateSingle = async (req, res) => {
  res.status(200).json({ message: 'Generar PDF de un solo documento' });
};

exports.generateMultipleZip = async (req, res) => {
    res.status(200).json({ message:  'Generar archivo comprido zip de los PDF ' });
};


exports.createResgisterDocument = async (req, res) => {
  try {
    const { name, contract, balance, date, phone } = req.body;
    if (!name || !contract || !balance || !date || !phone) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }
    const newDoc = await Document.create({ name, contract, balance, date, phone });
    res.status(201).json(newDoc);

  } catch (error) {
    console.error('Error al crear registro del documento', error);
    res.status(500).json({ message: 'Error al crear registro del documento' });
  }
}

exports.getAllResgistersDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll();
    res.json(documents);
  } catch (error) {
    console.error('Error al obtener documentos', error);
    res.status(500).json({ message: 'Error al obtener documentos' });
  }
};



exports.deleteDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findByPk(id);
    if (!doc) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }
    await doc.destroy();
    res.json({ message: 'Documento eliminado' });
  } catch (error) {
    console.error('Error al eliminar documento', error);
    res.status(500).json({ message: 'Error al eliminar documento' });
  }
};

exports.updateDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contract, balance, date, phone } = req.body;
    const doc = await Document.findByPk(id);
    if (!doc) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }
    doc.name = name || doc.name;
    doc.contract = contract || doc.contract;
    doc.balance = balance || doc.balance;
    doc.date = date || doc.date;
    doc.phone = phone || doc.phone;
    await doc.save();
    res.json(doc);
  } catch (error) {
    console.error('Error al actualizar documento', error);
    res.status(500).json({ message: 'Error al actualizar documento' });
  }
};


exports.getDocumentResgister = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findByPk(id);
    if (!doc) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }
    res.json(doc);
  } catch (error) {
    console.error('Error al obtener documento', error);
    res.status(404).json({ message: 'Error al obtener documento' });
  }
}