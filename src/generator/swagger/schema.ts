export interface Schema {
    type?: string;
    items?: {
        $ref: string;
    },
    $ref?: string;
}
