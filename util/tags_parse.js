const tagsConfig = require("../api/data/tags_config.json");

function parseTags(plcValues = {}) {
    if (!plcValues) {
        return {};
    }

    let result = {};

    for (const name in tagsConfig) {
        const tag = tagsConfig[name];

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
                result[name] = parseTags(tag, plcValues);
            }
        } else if (typeof tag == "string") {
            result[name] = plcValues[tag].toString();
        }
    }

    return result;
}

module.exports = {
    parseTags
}