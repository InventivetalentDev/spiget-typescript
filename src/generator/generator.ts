import { Schema } from "./swagger/schema";

export abstract class Generator {

    constructor(
        private logName: string
    ) {}

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

    protected info(message: string) {
        this.print("INFO", message);
    }

    protected warn(message: string) {
        this.print("WARN", message);
    }

    protected error(message: string) {
        this.print("ERR", message);
    }

    protected debug(message: string) {
        this.print("DEBUG", message);
    }

    private print(prefix: string, message: string) {
        console.log(`[Generator:${this.logName}:${prefix}] `, message)
    }

    abstract generate(): void;
}
