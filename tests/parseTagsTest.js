const { parseTags } = require("../util/tags_parse");
const values = require("../api/data/tagsPlc.json");

function test() {
    const data = parseTags(values);

    console.log(data);
}

test();