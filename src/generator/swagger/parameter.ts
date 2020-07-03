export interface Parameter {
    name: "page" | "sort" | "size" | "fields" | string;
    description?: string;
    in: "query" | "path";
}
