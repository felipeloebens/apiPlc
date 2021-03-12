module.exports = app => {
  const controller = app.controllers.plcData;

  app.route('/api/dadosMotores')
    .get(controller.listPlcDataMotores);

  app.route('/api/dadosValvulas')
    .get(controller.listPlcDataValvulas);
  
  app.route('/api/rotas')
    .get(controller.listPlcDataRotas);

  app.route('/api/dadosMultimedidores')
    .get(controller.listPlcDataMultimedidores);

  app.route('/api/gerenciador1')
    .get(controller.listPlcDataGer1);

  app.route('/api/gerenciador2')
    .get(controller.listPlcDataGer2);

  app.route('/api/gerenciador3')
    .get(controller.listPlcDataGer3);

  app.route('/api/gerenciador4')
    .get(controller.listPlcDataGer4);

  app.route('/api/gerenciador5')
    .get(controller.listPlcDataGer5);
    
}