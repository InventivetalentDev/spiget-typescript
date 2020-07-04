import { Schema } from "./swagger/schema";

/**
 * The source directory to generate the types inside it
 */
const SOURCE_DIR = "./src"

/**
 * Directory of generated types classes
 */
export const GENERATED_TYPES_DIR = `${SOURCE_DIR}/generated_types`;

/**
 * Directory of generated implementations
 */
export const TYPES_DIR = `${SOURCE_DIR}/types`;

/**
 * Swagger paths to skip in generation
 */
export const SKIPPED_PATHS = [
    "/resources/{resource}/download",
    "/resources/{resource}/versions/{version}/download"
];

/**
 * Transforms an array of string into a combined string with new lines
 *
 * @param source A source to build the combined string with it
 * @param endWithNewLine Finish the string with a new line or not
 */
export function buildWithNewLines(source: string[], endWithNewLine = true): string {
    if (source.length <= 0) {
        return "";
    }

    let result = "";
    for (let i = 0; i < source.length; i++) {
        result += source[i];
        if (i === source.length - 1 && !endWithNewLine) {
            continue;
        }
        result += "\n";
    }

    return result;
}

/**
 * Transform a name into camelized form
 *
 * Reference: https://stackoverflow.com/a/2970667/6257838
 *
 * @param source A name to camelize it
 */
export function camelize(name: string): string {
    return name.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return "";
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}
