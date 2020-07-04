import { Generator } from "./generator";
import { existsSync, createWriteStream } from "fs";
import { join } from "path";
import { TYPES_DIR, buildWithNewLines } from "./util";

export const allImplImports: string[] = [];

/**
 * Generates an implementation of the type class
 */
export class ImplementationGenerator extends Generator {
    private contents: string[] = [];

    constructor(
        private name: string
    ) {
        super("Implementation");
    }

    /**
     * Generate the implementation
     */
    public generate() {
        // Add the implementation import even if it exists
        allImplImports.push(`import ${this.name} from "./types/${this.name}";`);

        const path = join(TYPES_DIR, `${this.name}.ts`);
        // Check if the implementation file exists
        if (existsSync(path)) {
            return;
        }

        this.info(`Generating an implementation for [${this.name}]...`);

        // If not then generator the default implementation
        this.write();

        const stream = createWriteStream(path, { encoding: "utf-8" });
        stream.write(buildWithNewLines(this.contents));
        stream.close();
    }

    /**
     * Write the default implementation to the content of the class
     */
    private write() {
        // Write the import of the base class
        this.contents.push(`import ${this.name}Base from "../generated_types/${this.name}Base";\n`);

        // Write the export of the implementation class that extends the base class
        this.contents.push(`export default class ${this.name} extends ${this.name}Base {`);
        this.contents.push("}");
    }

}
