const fs = require("fs");
const path = require("path");
const swagger = require("../spiget-documentation/swagger.json");
const definitions = swagger.definitions;

const TYPES_DIR = "../src/types";

let combinedImports = "";

Object.keys(definitions).forEach(k => {
    let v = definitions[k];
    if (v.hasOwnProperty("type")) {
        console.log("Generating Type Class for " + k + " of type " + v.type)

        let imports = "";
        let content = "/* Generated on " + new Date().toUTCString() + "*/\n" +
            "export default class " + k + " {\n" +
            "  _raw: any;\n";
        let constr = "  constructor(source: any) {\n" +
            "    this._raw = source;\n" +
            "    if (source !== undefined) {\n";
        Object.keys(v.properties).forEach(p => {
            if (v.hasOwnProperty("properties")) {
                let prop = v.properties[p];
                let conv = convertPropType(prop);
                content += "  " + p + ": ";
                content += conv[0];
                content += ";\n";

                constr += "      if (source.hasOwnProperty(\"" + p + "\")) this." + p + " = source." + p + ";\n";

                if (conv.length > 1 && conv[1] !== undefined) {
                    imports += 'import ' + conv[1] + ' from "./' + conv[1] + '";\n';
                }
            } else {
                console.warn(p + " has no properties");
            }
        });

        constr += "    }\n";
        constr += "  }\n";
        content += "\n" + constr;
        content += "}\n";

        combinedImports += 'import ' + k + ' from "./types/' + k + '";\n';

        fs.writeFileSync(path.join(TYPES_DIR, k + ".ts"), imports + "\n" + content, "utf8");
    }
});
fs.writeFileSync(path.join(TYPES_DIR, "_imports.txt"), combinedImports, "utf8");

function convertPropType(prop) {
    if (prop.hasOwnProperty("$ref")) {
        if (prop["$ref"].startsWith("#/definitions/")) {
            let d = prop["$ref"].substr("#/definitions/".length);
            return [d, d]
        }
    }
    if (prop.hasOwnProperty("type")) {
        if (prop.type === "array") {
            let t = convertPropType(prop.items);
            return ["Array<" + t[0] + ">", t[1]]
        } else {
            return [prop.type]
        }
    }
    console.warn("failed to convert " + prop.type);
    return ["object /* failed to convert " + prop.type + " */"]
}
