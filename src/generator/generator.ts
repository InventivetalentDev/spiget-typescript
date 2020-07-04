import { Schema } from "./swagger/schema";

/**
 * Generate something out of some data
 */
export abstract class Generator {

    constructor(
        private logName: string
    ) {}

    /**
     * Get types depending on a schema
     * 
     * @param schema An array of types
     */
    protected convertSchemaType(schema: Schema): string[] {
        if (schema.$ref !== undefined) {
            if (schema.$ref.startsWith("#/definitions/")) {
                // "#/definitions/".length
                const d = schema.$ref.substr(14);
                return [d, d]
            }
        }
        if (schema.type !== undefined) {
            if (schema.type === "array") {
                const t = this.convertSchemaType(schema.items);
                return [`Array<${t[0]}>`, t[1]]
            } else {
                return [schema.type];
            }
        }
    
        this.warn("failed to convert " + schema.type);
        return ["object /* failed to convert " + schema.type + " */"]
    }

    /**
     * Print an information message
     * 
     * @param message A message to print
     */
    protected info(message: string) {
        this.print("INFO", message);
    }

    /**
     * Print an warning message
     * 
     * @param message A message to print
     */
    protected warn(message: string) {
        this.print("WARN", message);
    }

    /**
     * Print an error message
     * 
     * @param message A message to print
     */
    protected error(message: string) {
        this.print("ERR", message);
    }

    /**
     * Print an debug message
     * 
     * @param message A message to print
     */
    protected debug(message: string) {
        this.print("DEBUG", message);
    }

    /**
     * Print a message with prefix
     * 
     * @param prefix Prefix of the message
     * @param message A message to print
     */
    private print(prefix: string, message: string) {
        console.log(`[Generator:${this.logName}:${prefix}] `, message)
    }

    /**
     * Generate depending on the given data
     */
    abstract generate(): void;
}
