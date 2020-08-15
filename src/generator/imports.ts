import { Generator } from "./generator";
import { join } from "path";
import { GENERATED_TYPES_DIR, buildWithNewLines } from "./util";
import { allImplImports } from "./implementation";
import { writeFileSync } from "fs";

export class ImportsGenerator extends Generator {

    constructor() {
        super("Imports");
    }

    public generate() {
        this.info("Generating...");

        // Save all implementation imports in the _imports.txt
        const path = join(GENERATED_TYPES_DIR, "_imports.txt");
        writeFileSync(path, buildWithNewLines(allImplImports), "utf8");
    }

}
