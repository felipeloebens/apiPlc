const nodes7 = require('nodeS7');

const connConfig = require("../data/connPlc.json");
const tagsRequestConfig = require("../data/tagsPlc.json");

const { parseTags } = require("../../util/tags_parse");

class PlcController {
  constructor() {
    this.data = {};
    this.connection = new nodes7();
    this.connected = false;
  }

  async connect() {
    const error = await new Promise((resolve) => {
      this.connection.initiateConnection(connConfig, (error) => resolve(error));
    });

    await this.onConnected(error);
  }

  async onConnected(err) {
    if (typeof (err) !== "undefined") {
      console.log(err);
      return;
    }

    this.connected = true;

    this.connection.setTranslationCB((tag) => {
      return tagsRequestConfig[tag];
    });

    for (var tagName in tagsRequestConfig) {
      this.connection.addItems(tagName);
    }

    await this.readPlc();

    setInterval(this.readPlc, 1000);
  }

  async readPlc() {
    const values = await new Promise((resolve) => {
      this.connection.readAllItems((error, values) => {
        if (error) {
          console.log("Erro de leitura das tags!", error);
        }

        resolve(values);
      });
    });

    this.data = parseTags(values);
  }

  async listPlcDataMotores(req, res) {
    if (!this.connected) {
      await this.connect();
    }

    res.status(200).json(this.data.motores);
  }

  async listPlcDataValvulas(req, res) {
    if (!this.connected) {
      await this.connect();
    }

    res.status(200).json(this.data.valvulas);
  }

  async listPlcDataRotas(req, res) {
    if (!this.connected) {
      await this.connect();
    }

    res.status(200).json(this.data.rotas);
  }

  async listPlcDataMultimedidores(req, res) {
    if (!this.connected) {
      await this.connect();
    }

    res.status(200).json(this.data.multimedidores);
  }

  async listPlcDataGer(req, res) {
    if (!this.connected) {
      await this.connect();
    }

    const gerador = req.params.id;

    if (gerador > 0 && gerador < 6) {
      return res.status(200).json(this.data["gerenciador" + gerador]);
    }

    res.status(404);
  }
}

module.exports = new PlcController();