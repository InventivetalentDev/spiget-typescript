export interface Schema {
    type?: string;
    items?: Schema,
    $ref?: string;
}
