import { Generator } from "./generator";
import { existsSync, createWriteStream } from "fs";
import { join } from "path";
import { TYPES_DIR, buildWithNewLines } from "./util";

// TODO A list of all implementations created

export class ImplementationGenerator extends Generator {
    private contents: string[];

    constructor(
        private name: string
    ) {
        super("Implementation");
    }

    public generate() {
        const path = join(TYPES_DIR, `${name}.ts`);
        // Check if the implementation file exists
        if (existsSync(path)) {
            return;
        }

        this.info(`Generating an implementation for [${name}Base.ts]...`);

        // If not then generator the default implementation
        this.write();

        const stream = createWriteStream(path, { encoding: "utf-8" });
        stream.write(buildWithNewLines(this.contents));
        stream.close();

        // TODO add the implementation to the list
    }

    private write() {
        // Write the import of the base class
        this.contents.push(`import ${name}Base from "../generated_types/${name}Base";`);
        this.contents.push("\n");

        // Write the export of the implementation class that extends the base class
        this.contents.push(`export default class ${name} extends ${name}Base {`);
        this.contents.push("}");
    }

}
