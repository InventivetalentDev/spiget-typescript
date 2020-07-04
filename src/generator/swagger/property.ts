import { Schema } from "./schema";

/**
 * An interface that represents a property in the swagger file
 */
export interface Property extends Schema {
    description?: string;
    $ref: string;
    type: string;
    items: Property;
}
