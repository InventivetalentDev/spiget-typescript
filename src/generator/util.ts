import { Property } from "./swagger/property";

export const GENERATED_TYPES_DIR = "../src/generated_types";
export const TYPES_DIR = "../src/types"

export function convertPropertyType(property: Property): string[] {
    if (property.$ref !== undefined) {
        if (property.$ref.startsWith("#/definitions/")) {
            // "#/definitions/".length
            const d = property.$ref.substr(14);
            return [d, d]
        }
    }
    if (property.type !== undefined) {
        if (property.type === "array") {
            const t = convertPropertyType(property.items);
            return [`Array<${t[0]}>`, t[1]]
        } else {
            return [property.type];
        }
    }
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
