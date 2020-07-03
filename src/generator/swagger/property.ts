export interface Property {
    description?: string;
    $ref: string;
    type: string;
    items: Property;
}
