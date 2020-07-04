
/**
 * An interface that helps declaring the type of property or parameter in the swagger file
 */
export interface Schema {
    type?: string;
    items?: Schema,
    $ref?: string;
}
