const fs = require("fs");
const path = require("path");
const swagger = require("../spiget-documentation/swagger.json");
const definitions = swagger.definitions;
const paths = swagger.paths;

const TYPES_DIR = "../src/types";

let combinedImports = "";

Object.keys(definitions).forEach(k => {
    let v = definitions[k];
    if (v.hasOwnProperty("type")) {
        console.log("Generating Type Class for " + k + " of type " + v.type)

        let imports = "import Spiget from \"../Spiget\"\n" +
            "import SpigetType from \"../SpigetType\"\n";
        let content = "export class " + k + " extends SpigetType {\n";
        let constr = "  constructor(source: any, spiget: Spiget = new Spiget()) {\n" +
            "    super(source, spiget);\n" +
            "    if (source !== undefined) {\n";
        Object.keys(v.properties).forEach(p => {
            if (v.hasOwnProperty("properties")) {
                let prop = v.properties[p];
                let conv = convertPropType(prop);
                if (prop.hasOwnProperty("description")) {
                    content += "  /** " + prop.description + " **/\n"
                }
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
        content += "}\n" +
            "export default " + k + ";\n";

        combinedImports += 'import ' + k + ' from "./types/' + k + '";\n';

        fs.writeFileSync(path.join(TYPES_DIR, k + ".ts"), imports + "\n" + content, "utf8");

        let implPath = path.join(TYPES_DIR + "_", k + "Impl.ts");
        if (!fs.existsSync(implPath)) {
            fs.writeFileSync(implPath, "import " + k + " from \"../types/" + k + "\";\n\n" +
                "export default class " + k + "Impl extends " + k + " {\n" +
                "}\n")
        }
    }
});
fs.writeFileSync(path.join(TYPES_DIR, "_imports.txt"), combinedImports, "utf8");

/* original => alias */
const pathAliases = {
    "getAuthorDetails": "getAuthor",
    "getAuthorList": "getAuthors",
    "getCategoryList": "getCategories",
    "getCategoryDetails": "getCategory",
    "getResourceList": "getResources",
    "getResourceDetails": "getResource",
    "getFreeResourceList": "getFreeResources",
    "getPremiumResourceList": "getPremiumResources"
};

let functions = "class Paths {\n";
Object.keys(paths).forEach(p => {
    let path = paths[p];
    Object.keys(path).forEach(method => {
        let pathM = path[method];

        console.log("Generating " + method.toUpperCase() + " " + p);

        let func = "";
        func += "/** \n" +
            method.toUpperCase() + " " + p + "\n" +
            pathM.description + "\n" +
            "**/\n"
        let funcName = camelize(method.trim() + pathM.summary);
        func += funcName;
        func += "(";
        let first = true;
        let hasPagination = false;
        let hasFields = false;
        let pathParamNames = [];
        let queryParamNames = [];
        let paramsInOrder = [];

        let paramString = "";
        pathM.parameters.forEach(param => {
            if (param.name === "page" || param.name === "sort") {// ignored, handled by size
                return;
            }
            if (!first) {
                paramString += ", ";
            }
            if (param.name === "size") {
                paramString += "pagination: Pagination = undefined";
                hasPagination = true;
                paramsInOrder.push("pagination");
            } else if (param.name === "fields") {
                paramString += "fields: Fields = []";
                hasFields = true;
                paramsInOrder.push("fields");
            } else {
                paramString += param.name + ": " + convertPropType(param);
                if (param.in === "path") {
                    pathParamNames.push(param.name);
                } else if (param.in === "query") {
                    queryParamNames.push(param.name);
                }
                paramsInOrder.push(param.name);
            }
            first = false;
        });
        func += paramString;
        func += ")";
        let returnType = "any";
        let returnTypeBase = "any";
        let isArrayReturn = false;

        let returnString = "";
        if (pathM.hasOwnProperty("responses")) {
            let responses = pathM["responses"];
            if (responses.hasOwnProperty("200")) {
                let ok = responses["200"];
                if (ok.hasOwnProperty("schema")) {
                    let c = convertPropType(ok.schema);
                    let t = c[0];
                    if (t.startsWith("inline_response_")) {
                        t = "any";
                        returnTypeBase = "any";
                    } else {
                        returnTypeBase = c[1];
                    }
                    returnType = "Promise<" + t + ">";
                    returnString += ": " + returnType;
                    isArrayReturn = ok.schema.type === "array";
                } else {
                    returnType = "Promise<any>";
                    returnString += ": " + returnType;
                }
            }
        }
        func += returnString;
        func += " {\n";
        func += "  return new " + returnType + "((resolve, reject) => {\n";
        func += "    let query = " + ((hasPagination || hasFields) ? "this.__addPaginationAndFieldsToQuery(pagination, fields)" : "{}") + ";\n";
        queryParamNames.forEach(q => {
            func += "    query[\"" + q + "\"] = " + q + ";\n";
        });
        let replacedPath = p;
        pathParamNames.forEach(n => {
            replacedPath = replacedPath.replace("{" + n + "}", "\" + " + n + " + \"");
        });
        func += "    this.__request(\"" + method.toUpperCase() + "\", \"" + replacedPath + "\", query).then(res" + (isArrayReturn ? "Arr" : "") + " => {\n";
        func += "      resolve(this.__mapType" + (isArrayReturn ? "List" : "") + "(res" + (isArrayReturn ? "Arr" : "") + ", " + returnTypeBase + "));\n";
        func += "    }).catch(reject);\n"
        func += "  });\n";
        func += "}\n";
        functions += func + "\n\n";

        if (pathAliases.hasOwnProperty(funcName)) {
            functions += "/**\n" +
                "Alias of " + funcName + "\n" +
                "**/\n";
            functions += pathAliases[funcName] + "(" + paramString + ")" + returnString + " {\n" +
                "  return this." + funcName + "(" + paramsInOrder.join(",") + ");\n" +
                "}\n\n"
        }
    })
});
functions += "}\n";
fs.writeFileSync(path.join(TYPES_DIR, "_functions.ts"), functions, "utf8");

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

// https://stackoverflow.com/a/2970667/6257838
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}
