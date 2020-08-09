import { Generator } from "./generator";
import { join } from "path";
import { TYPES_DIR, buildWithNewLines } from "./util";
import { allImplExports } from "./implementation";
import { writeFileSync } from "fs";

export class ExportsGenerator extends Generator {

    constructor() {
        super("Exports");
    }

    public generate() {
        this.info("Generating...");

        // Save all exports in index.ts
        const path = join(TYPES_DIR, "index.ts");
        writeFileSync(path, buildWithNewLines(allImplExports), "utf8");
    }

}
