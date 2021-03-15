const tagsConfig = require("../api/data/tags_config.json");

function parseTags(plcValues, obj) {
    obj = obj || tagsConfig;

    if (!plcValues) {
        return {};
    }

    let result = {};

    for (const name in obj) {
        const tag = obj[name];

        if (!tag) continue;

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
                result[name] = parseTags(plcValues, tag);
            }
        } else if (typeof tag == "string") {
            if (isNaN(name)){
                result[name] = plcValues[tag] + "";
            }else{
                result[tag] = plcValues[tag] + "";
            }
        }
    }

    return result;
}

module.exports = {
    parseTags
}