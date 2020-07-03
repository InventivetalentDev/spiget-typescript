import { Generator } from "./generator";
import { existsSync, createWriteStream } from "fs";
import { join } from "path";
import { TYPES_DIR, buildWithNewLines } from "./util";

export const allImplImports: string[] = [];

export class ImplementationGenerator extends Generator {
    private contents: string[] = [];

    constructor(
        private name: string
    ) {
        super("Implementation");
    }

    public generate() {
        const path = join(TYPES_DIR, `${this.name}.ts`);
        // Check if the implementation file exists
        if (existsSync(path)) {
            return;
        }

        this.info(`Generating an implementation for [${this.name}Base.ts]...`);

        // If not then generator the default implementation
        this.write();

        const stream = createWriteStream(path, { encoding: "utf-8" });
        stream.write(buildWithNewLines(this.contents));
        stream.close();

        allImplImports.push(`import ${this.name} from "./types/${this.name};`);
    }

    private write() {
        // Write the import of the base class
        this.contents.push(`import ${this.name}Base from "../generated_types/${this.name}Base";`);
        this.contents.push("\n");

        // Write the export of the implementation class that extends the base class
        this.contents.push(`export default class ${this.name} extends ${this.name}Base {`);
        this.contents.push("}");
    }

}
