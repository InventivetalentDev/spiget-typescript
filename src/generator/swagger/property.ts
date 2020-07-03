import { Schema } from "./schema";

export interface Property extends Schema {
    description?: string;
    $ref: string;
    type: string;
    items: Property;
}
