import { Schema } from "./swagger/schema";

const SOURCE_DIR = "./src"
export const GENERATED_TYPES_DIR = `${SOURCE_DIR}/generated_types`;
export const TYPES_DIR = `${SOURCE_DIR}/types`;

export function buildWithNewLines(array: string[], endWithNewLine = true): string {
    if (array.length <= 0) {
        return "";
    }

    let result = "";
    for (let i = 0; i < array.length; i++) {
        result += array[i];
        if (i === array.length - 1 && !endWithNewLine) {
            continue;
        }
        result += "\n";
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
