const config = require("../config/tags_config.json");

function getTagsUsingConfig() {
    conn.readAllItems((error, values) => {
        if (error) {
            return console.log(error);
        }

        tagsFromConfig(config, values);
    });
}

function tagsFromConfig(tagsConfig, plcValues) {
    let result = {};

    for (const name in tagsConfig) {
        const tag = tagsConfig[name];

        if (typeof tag == "object") {
            if (tag.name) {
                let value = plcValues[tag.name];
                if (tag.replace && tag.replace.length == 2) {
                    value = value.split(tag.replace[0]).join(tag.replace[1]);
                }
                if (tag.slice && tag.slice.length == 2) {
                    value = value.slice(tag.slice[0], tag.slice[1]);
                }
                result[name] = value;
            } else {
                result[name] = tagsFromConfig(tag, plcValues);
            }
        } else if (typeof tag == "string") {
            result[name] = plcValues[tag].toString();
        }
    }

    return result;
}

const test = tagsFromConfig(config, {
    TipoMotor: "1234567890",
    TagsMotor: "1234567890",
    StatusMotor: "1234567890",
    DadosMotorString: "1234567890",
    StringCorrenteNom: "1234567890",
    StringkW: "1234567890",
    CorrenteMotores: "1234567890",
    StringSensores: "1234567890",
    TipoPneumatico: "1234567890",
    DadosPneumaticoString: "1234567890",
    StatusPneumatico: "1234567890",
    TipoPneumatico: "1234567890",
});

console.log(test);

module.exports = {
    getTagsUsingConfig,
    tagsFromConfig
}