import { Schema } from "./schema";

export interface Parameter extends Schema {
    name: "page" | "sort" | "size" | "fields" | string;
    description?: string;
    in: "query" | "path";
}
