import { definitions, paths } from "../../spiget-documentation/swagger.json";
import { Definition } from "./swagger/definition";
import { TypeGenerator } from "./type";
import { Path } from "./swagger/path";
import { join } from "path";
import { GENERATED_TYPES_DIR } from "./util";
import { createWriteStream, WriteStream } from "fs";
import { FunctionGenerator } from "./function";
import { Method } from "./swagger/method";

export function generator() {
    // Generate the type classes
    for (const name of Object.keys(definitions)) {
        const definition: Definition = definitions[name];

        const generator = new TypeGenerator(name, definition);
        generator.generate();
    }

    // Generate the path functions
    const path = join(GENERATED_TYPES_DIR, "_functions.ts");
    const stream = createWriteStream(path, { encoding: "utf8" });
    write(stream, `class Paths {`);

    for (const name of Object.keys(paths)) {
        const path: Path = paths[name];

        for (const methodName of Object.keys(path)) {
            const method: Method = path[methodName];

            const generator = new FunctionGenerator(methodName, name, method, stream);
            generator.generate();
        }
    }

    write(stream, `}`);
    stream.close();
}

function write(stream: WriteStream, line: string) {
    stream.write(`${line}\n`);
}
