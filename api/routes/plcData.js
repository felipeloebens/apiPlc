const router = require("express").Router();
const controller = require("../controllers/PlcController");

router.get('/api/dadosMotores', controller.listPlcDataMotores);
router.get('/api/dadosValvulas', controller.listPlcDataValvulas);
router.get('/api/rotas', controller.listPlcDataRotas);
router.get('/api/dadosMultimedidores', controller.listPlcDataMultimedidores);
router.get('/api/gerenciador/:id', controller.listPlcDataGer);

controller.connect();

module.exports = router;