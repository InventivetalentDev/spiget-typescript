import { definitions, paths } from "../../spiget-documentation/swagger.json";
import { Definition } from "./swagger/definition";
import { TypeGenerator } from "./type";
import { Path } from "./swagger/path";
import { join } from "path";
import { GENERATED_TYPES_DIR, TYPES_DIR, SKIPPED_PATHS } from "./util";
import { createWriteStream, WriteStream, existsSync, mkdirSync } from "fs";
import { FunctionGenerator } from "./function";
import { Method } from "./swagger/method";
import { ImportsGenerator } from "./imports";

export function start() {
    console.log("[INFO] Generating from swagger...");

    // Check if the output directories exists
    mkdir(GENERATED_TYPES_DIR);
    mkdir(TYPES_DIR);

    // Generate the type classes and their implementations
    for (const name of Object.keys(definitions)) {
        const definition: Definition = definitions[name];

        if (definition.type === undefined) {
            continue;
        }

        const generator = new TypeGenerator(name, definition);
        generator.generate();
    }

    // Generate the path functions and its aliases
    const path = join(GENERATED_TYPES_DIR, "_functions.ts");
    const stream = createWriteStream(path, { encoding: "utf8" });

    for (const name of Object.keys(paths)) {
        if (SKIPPED_PATHS.includes(name)) continue;
        const path: Path = paths[name];

        for (const methodName of Object.keys(path)) {
            const method: Method = path[methodName];

            const generator = new FunctionGenerator(methodName, name, method, stream);
            generator.generate();
        }
    }

    stream.close();

    const importsGen = new ImportsGenerator();
    importsGen.generate();

    console.log("[INFO] Successfully! Generated from the swagger.");
}

function write(stream: WriteStream, line: string) {
    stream.write(`${line}\n`);
}

function mkdir(filename: string) {
    const path = join(filename);
    if (existsSync(path)) {
        return;
    }

    mkdirSync(path, { recursive: true });
}

start();
