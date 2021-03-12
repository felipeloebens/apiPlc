
  module.exports = app => {

  const plcData = require('../../server')
  const controller = {};

    controller.listPlcDataMotores = (req, res) => res.status(200).json(plcData.jsonMotores);
    controller.listPlcDataValvulas = (req, res) => res.status(200).json(plcData.jsonValvulas);
    controller.listPlcDataRotas = (req, res) => res.status(200).json(plcData.jsonRotas);
    controller.listPlcDataMultimedidores = (req, res) => res.status(200).json(plcData.jsonMultimedidores);
    controller.listPlcDataGer1 = (req, res) => res.status(200).json(plcData.jsonGerenciador1);
    controller.listPlcDataGer2 = (req, res) => res.status(200).json(plcData.jsonGerenciador2);
    controller.listPlcDataGer3 = (req, res) => res.status(200).json(plcData.jsonGerenciador3);
    controller.listPlcDataGer4 = (req, res) => res.status(200).json(plcData.jsonGerenciador4);
    controller.listPlcDataGer5 = (req, res) => res.status(200).json(plcData.jsonGerenciador5);

  return controller;
}