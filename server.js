const app = require('./config/express')();
const port = app.get('port');


var nodes7 = require('nodeS7') 


var conn = new nodes7;
var doneReading = false;
var doneWriting = false;

var fs = require('fs');
const { Console } = require('console');

let jsonConnFile = fs.readFileSync('./api/data/connPlc.json');
let connS7 = JSON.parse(jsonConnFile);

let jsonTagsFile = fs.readFileSync('./api/data/tagsPlc.json');
let variables = JSON.parse(jsonTagsFile);

conn.initiateConnection(connS7, connected); // slot 2 for 300/400, slot 1 for 1200/1500

function connected(err) {
	if (typeof(err) !== "undefined") {
		// We have an error.  Maybe the PLC is not reachable.
		console.log(err);
		process.exit();
    }
    
    conn.setTranslationCB(function(tag) {return variables[tag];}); 	// This sets the "translation" to allow us to work with object names
    
    var keys = []
    for(var k in variables){
        keys.push(k);
    }

    for (var i=0; i<keys.length;i++){
        conn.addItems(keys[i]);
    }
   
    function readPlc (){

      conn.readAllItems(valuesReady);
    }
    setInterval(readPlc, 1000);
	 
}



function valuesReady(anythingBad, values) {

    if (anythingBad) { console.log("Erro de leitura das tags!!!!!"); }
    
    doneReading = true;
    var jsonMotores = {

      tipoMotores: '' + values.TipoMotor,
      tagsMotores: ('' + values.TagsMotor).slice(0, -1),
      statusMotores: ('' + values.StatusMotor).slice(0, -1),
      dadosMotores: ('' + values.DadosMotorString).replace(/ /gi,"").slice(0, -1),
      correnteNominalMotores: ('' + values.StringCorrenteNom).replace(/ /gi,"").slice(0, -1),
      potenciaNominalMotores: ('' + values.StringkW).replace(/ /gi,"").slice(0, -1),
      correnteMotores: ('' + values.CorrenteMotores).replace(/ /gi,"").slice(0, -1),
      sensoresMotores: ('' + values.StringSensores).replace(/ /gi,"").slice(0, -1)

  };

  var jsonValvulas = {
      
    tagsValvulas: ('' + values.TipoPneumatico).slice(0, -1),
    dadosValvulas: ('' + values.DadosPneumaticoString).replace(/ /gi,"").slice(0, -1),
    statusValvulas: ('' + values.StatusPneumatico).slice(0, -1),
    tipoValvulas: '' + values.TipoPneumatico,

};

var jsonMultimedidores = {

    dadosMultimedidor1: ('' + values.DadosMultimedidor1).replace(/ /gi,"").slice(0, -1),
    dadosMultimedidor2: ('' + values.DadosMultimedidor2).replace(/ /gi,"").slice(0, -1),
    dadosMultimedidor3: ('' + values.DadosMultimedidor3).replace(/ /gi,"").slice(0, -1),
    dadosMultimedidor4: ('' + values.DadosMultimedidor4).replace(/ /gi,"").slice(0, -1),
    numMultimedidores: values.NroMultimedidores
};  

var jsonGerenciador1 = {

    liga : values.StartGer1,
    desliga : values.StopGer1,
    numRota : values.NumRotaGer1,
    tempoLimpeza : values.TempoLimpGer1,
    parametroRota : values.ParametroGer1,
    equipCorrenteRota : values.EquiCorrenteGer1,
    tempoLimpezaDecorrido : values.TempoLimpDecorridoGer1,
    mensagem : values.MensagemGer1,
    equipPartindo : values.PartindoGer1,
    status : values.StatusGer1,
    progresso : values.ProgressoGer1,
    tempoRotaLigar : values.TempoRotaGer1,
    potenciaRota : values.PotenciaRotaGer1,
    correnteRota : values.CorrenteRotaGer1,
    correnteNominalRota : values.CorrenteNomRotaGer1,
    correnteInstRota : values.CorrenteInstGer1,
    capacidadeTonHora : values.CapTonHoraRotaGer1,
    usoRota : values.UsoRotaGer1,
    tonHorInst : values.TonHoraInstRotaGer1,
    correnteVazio: values.CorrenteVazioRotaGer1,
    seq : values.SeqAtualGer1,
    nomeRota : values.NomeRotaAtualGer1
};

var jsonGerenciador2 = {

  liga : values.StartGer2,
  desliga : values.StopGer2,
  numRota : values.NumRotaGer2,
  tempoLimpeza : values.TempoLimpGer2,
  parametroRota : values.ParametroGer2,
  equipCorrenteRota : values.EquiCorrenteGer2,
  tempoLimpezaDecorrido : values.TempoLimpDecorridoGer2,
  mensagem : values.MensagemGer2,
  equipPartindo : values.PartindoGer2,
  status : values.StatusGer2,
  progresso : values.ProgressoGer2,
  tempoRotaLigar : values.TempoRotaGer2,
  potenciaRota : values.PotenciaRotaGer2,
  correnteRota : values.CorrenteRotaGer2,
  correnteNominalRota : values.CorrenteNomRotaGer2,
  correnteInstRota : values.CorrenteInstGer2,
  capacidadeTonHora : values.CapTonHoraRotaGer2,
  usoRota : values.UsoRotaGer2,
  tonHorInst : values.TonHoraInstRotaGer2,
  correnteVazio : values.CorrenteVazioRotaGer2,
  seq : values.SeqAtualGer2,
  nomeRota : values.NomeRotaAtualGer2

};

var jsonGerenciador3 = {

  liga : values.StartGer3,
  desliga : values.StopGer3,
  numRota : values.NumRotaGer3,
  tempoLimpeza : values.TempoLimpGer3,
  parametroRota : values.ParametroGer3,
  equipCorrenteRota : values.EquiCorrenteGer3,
  tempoLimpezaDecorrido : values.TempoLimpDecorridoGer3,
  mensagem : values.MensagemGer3,
  equipPartindo : values.PartindoGer3,
  status : values.StatusGer3,
  progresso : values.ProgressoGer3,
  tempoRotaLigar : values.TempoRotaGer3,
  potenciaRota : values.PotenciaRotaGer3,
  correnteRota : values.CorrenteRotaGer3,
  correnteNominalRota : values.CorrenteNomRotaGer3,
  correnteInstRota : values.CorrenteInstGer3,
  capacidadeTonHora : values.CapTonHoraRotaGer3,
  usoRota : values.UsoRotaGer3,
  tonHorInst : values.TonHoraInstRotaGer3,
  correnteVazio: values.CorrenteVazioRotaGer3,
  seq : values.SeqAtualGer3,
  nomeRota : values.NomeRotaAtualGer3
};

var jsonGerenciador4 = {

  liga : values.StartGer4,
  desliga : values.StopGer4,
  numRota : values.NumRotaGer4,
  tempoLimpeza : values.TempoLimpGer4,
  parametroRota : values.ParametroGer4,
  equipCorrenteRota : values.EquiCorrenteGer4,
  tempoLimpezaDecorrido : values.TempoLimpDecorridoGer4,
  mensagem : values.MensagemGer4,
  equipPartindo : values.PartindoGer4,
  status : values.StatusGer4,
  progresso : values.ProgressoGer4,
  tempoRotaLigar : values.TempoRotaGer4,
  potenciaRota : values.PotenciaRotaGer4,
  correnteRota : values.CorrenteRotaGer4,
  correnteNominalRota : values.CorrenteNomRotaGer4,
  correnteInstRota : values.CorrenteInstGer4,
  capacidadeTonHora : values.CapTonHoraRotaGer4,
  usoRota : values.UsoRotaGer4,
  tonHorInst : values.TonHoraInstRotaGer4,
  correnteVazio: values.CorrenteVazioRotaGer4,
  seq : values.SeqAtualGer4,
  nomeRota : values.NomeRotaAtualGer4
};

var jsonGerenciador5 = {

  liga : values.StartGer5,
  desliga : values.StopGer5,
  numRota : values.NumRotaGer5,
  tempoLimpeza : values.TempoLimpGer5,
  parametroRota : values.ParametroGer5,
  equipCorrenteRota : values.EquiCorrenteGer5,
  tempoLimpezaDecorrido : values.TempoLimpDecorridoGer5,
  mensagem : values.MensagemGer5,
  equipPartindo : values.PartindoGer5,
  status : values.StatusGer5,
  progresso : values.ProgressoGer5,
  tempoRotaLigar : values.TempoRotaGer5,
  potenciaRota : values.PotenciaRotaGer5,
  correnteRota : values.CorrenteRotaGer5,
  correnteNominalRota : values.CorrenteNomRotaGer5,
  correnteInstRota : values.CorrenteInstGer5,
  capacidadeTonHora : values.CapTonHoraRotaGer5,
  usoRota : values.UsoRotaGer5,
  tonHorInst : values.TonHoraInstRotaGer5,
  correnteVazio: values.CorrenteVazioRotaGer5,
  seq : values.SeqAtualGer5,
  nomeRota : values.NomeRotaAtualGer5
};

var jsonRotas = {
  0 : values.Rota1,
  1 : values.Rota2,
  2 : values.Rota3,
  3 : values.Rota4,
  4 : values.Rota5,
  5 : values.Rota6,
  6 : values.Rota7,
  7 : values.Rota8,
  8 : values.Rota9,
  9 : values.Rota10,
  10 : values.Rota11,
  11 : values.Rota12,
  12 : values.Rota13,
  13 : values.Rota14,
  14 : values.Rota15,
  15 : values.Rota16,
  16 : values.Rota17,
  17 : values.Rota18,
  18 : values.Rota19,
  19 : values.Rota20,
  20 : values.Rota21,
  21 : values.Rota22,
  22 : values.Rota23,
  23 : values.Rota24,
  24 : values.Rota25,
  25 : values.Rota26,
  26 : values.Rota27,
  27 : values.Rota28,
  28 : values.Rota29,
  29 : values.Rota30,
  30 : values.Rota31,
  31 : values.Rota32,
  32 : values.Rota33,
  33 : values.Rota34,
  34 : values.Rota35,
  35 : values.Rota36,
  36 : values.Rota37,
  37 : values.Rota38,
  38 : values.Rota39,
  39 : values.Rota40,
  40 : values.Rota41,
  41 : values.Rota42,
  42 : values.Rota43,
  43 : values.Rota44,
  44 : values.Rota45,
  45 : values.Rota46,
  46 : values.Rota47,
  47 : values.Rota48,
  48 : values.Rota49,
  49 : values.Rota50,
  50 : values.Rota51,
  51 : values.Rota52,
  52 : values.Rota53,
  53 : values.Rota54,
  54 : values.Rota55,
  55 : values.Rota56,
  56 : values.Rota57,
  57 : values.Rota58,
  58 : values.Rota59,
  59 : values.Rota60,
  60 : values.Rota61,
  61 : values.Rota62,
  62 : values.Rota63,
  63 : values.Rota64,
  64 : values.Rota65,
  65 : values.Rota66,
  66 : values.Rota67,
  67 : values.Rota68,
  68 : values.Rota69,
  69 : values.Rota70,
  70 : values.Rota71,
  71 : values.Rota72,
  72 : values.Rota73,
  73 : values.Rota74,
  74 : values.Rota75,
  75 : values.Rota76,
  76 : values.Rota77,
  77 : values.Rota78,
  78 : values.Rota79,
  79 : values.Rota80,
  80 : values.Rota81,
  81 : values.Rota82,
  82 : values.Rota83,
  83 : values.Rota84,
  84 : values.Rota85,
  85 : values.Rota86,
  86 : values.Rota87,
  87 : values.Rota88,
  88 : values.Rota89,
  89 : values.Rota90,
  90 : values.Rota91,
  91 : values.Rota92,
  92 : values.Rota93,
  93 : values.Rota94,
  94 : values.Rota95,
  95 : values.Rota96,
  96 : values.Rota97,
  97 : values.Rota98,
  98 : values.Rota99,
  99 : values.Rota100
};

module.exports.jsonGerenciador1 = jsonGerenciador1;
module.exports.jsonGerenciador2 = jsonGerenciador2;
module.exports.jsonGerenciador3 = jsonGerenciador3;
module.exports.jsonGerenciador4 = jsonGerenciador4;
module.exports.jsonGerenciador5 = jsonGerenciador5;
module.exports.jsonMotores = jsonMotores;
module.exports.jsonValvulas = jsonValvulas;
module.exports.jsonRotas = jsonRotas;
module.exports.jsonMultimedidores = jsonMultimedidores;

    //if (doneReading) { process.exit(); }
    
   
}




function valuesWritten(anythingBad) {
	if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
	console.log("Done writing.");
	doneWriting = true;
	
}

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});