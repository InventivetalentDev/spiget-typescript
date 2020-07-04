import { Schema } from "./schema";

/**
 * An interface that represents a parameter of path in the swagger file
 */
export interface Parameter extends Schema {
    name: "page" | "sort" | "size" | "fields" | string;
    description?: string;
    in: "query" | "path";
}
