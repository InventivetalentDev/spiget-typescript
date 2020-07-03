import { Schema } from "./swagger/schema";

export const GENERATED_TYPES_DIR = "../src/generated_types";
export const TYPES_DIR = "../src/types"

export function convertSchemaType(schema: Schema): string[] {
    if (schema.$ref !== undefined) {
        if (schema.$ref.startsWith("#/definitions/")) {
            // "#/definitions/".length
            const d = schema.$ref.substr(14);
            return [d, d]
        }
    }
    if (schema.type !== undefined) {
        if (schema.type === "array") {
            const t = convertSchemaType(schema.items);
            return [`Array<${t[0]}>`, t[1]]
        } else {
            return [schema.type];
        }
    }

    console.warn("failed to convert " + schema.type);
    return ["object /* failed to convert " + schema.type + " */"]
}

export function buildWithNewLines(array: string[]): string {
    if (array.length <= 0) {
        return "";
    }

    let result = "";
    for (const line of array) {
        result += `${line}\n`;
    }

    return result;
}

// https://stackoverflow.com/a/2970667/6257838
export function camelize(value: string): string {
    return value.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}
