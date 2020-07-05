import { Generator } from "./generator";
import { createInterface } from "readline";
import { createReadStream, createWriteStream } from "fs";
import { join } from "path";
import { GENERATED_TYPES_DIR, SOURCE_DIR } from "./util";

const NOT_FOUND = -1;

/**
 * Takes source with code and apply it to the target
 */
class ApplyGenerator extends Generator {
    private targetContent: string[] = [];

    private startIndex = NOT_FOUND;
    private endIndex = NOT_FOUND;

    constructor(

        /**
         * The name of start and end point
         */
        private name: string,

        /**
         * Where the generator will copy the code and apply it to the target
         */
        private source: string,

        /**
         * Target to apply the generated code to it
         */
        private target: string,

        /**
         * A prefix written before any written line to the stream
         */
        private prefix: string = ""
    ) {
        super("Apply");
    }

    public async generate() {
        this.info(`Applying ${this.name} from ${this.source} to ${this.target}`);
        try {
            await this.read();

            await this.apply();
        } catch (e) {
            this.error(`Failed to apply! Message: ${e}`);
            
            // To log the stack trace of the error
            throw e;
        }
    }

    /**
     * Read the target file and store it in the memory
     */
    private async read() {
        const stream = createReadStream(this.target, { encoding: 'utf8' });

        const lines = createInterface({
            input: stream
        });


        for await (const line of lines) {
            let filteredLine = line.trim();

            if (!filteredLine.startsWith("/**")) {
                this.targetContent.push(line);
                continue;
            }

            // Maybe we have "/**" but its length is not enough
            if (filteredLine.length < 5)  {
                this.targetContent.push(line);
                continue;
            }

            // Declare the start line
            if (filteredLine[4] === "G") {
                if (this.startIndex != NOT_FOUND) {
                    throw new Error("Too many start points!");
                }

                this.startIndex = this.targetContent.length;

                continue;
            } else if (filteredLine[4] === "E") { // Declare the end line
                if (this.endIndex != NOT_FOUND) {
                    throw new Error("Too many end points!");
                }

                this.endIndex = this.targetContent.length;
            } else { // It didn't match anything above
                this.targetContent.push(line);
                continue;
            }

        }

        stream.close();
    }

    /**
     * Where the magic happens
     */
    private async apply() {
        // Rewrite the target file
        const stream = createWriteStream(this.target, { encoding: 'utf8' });
    
        // Write from the target content ( stored in mem )
        for (let i = 0; i < this.startIndex; i++) {
            const line = this.targetContent[i];
            stream.write(line);
            stream.write("\n");
        }
        
        const sourceStream = createReadStream(this.source, { encoding: 'utf8' });
        const source = createInterface({
            input: sourceStream
        });

        // Write the start point
        stream.write(this.prefix);
        stream.write(this.startPoint);
        stream.write("\n\n");

        // Read from the source file and write it to the target
        for await (const line of source) {
            stream.write(this.prefix);
            stream.write(line)
            stream.write("\n");
        }

        // Write the end point
        stream.write(this.prefix);
        stream.write(this.endPoint);
        stream.write("\n");

        // When the source file is finished write the end point
        // Continue you writing from the target content ( stored in mem ) till the end
        for (let i = this.endIndex; i < this.targetContent.length; i++) {
            const line = this.targetContent[i];
            stream.write(this.prefix);
            stream.write(line);
            stream.write("\n");
        }

        stream.close();
    }
    
    private comment(value: string): string{
        return `/** ${value} */`;
    }

    private get startPoint() {
        return this.comment(`Generated: ${this.name}`);
    }

    private get endPoint() {
        return this.comment(`End Generated`);
    }

}

export function start() {
    const functionsGen = new ApplyGenerator(
        "Functions",
        join(GENERATED_TYPES_DIR, "_functions.ts"),
        join(SOURCE_DIR, "Spiget.ts"),
        "    "
    );
    functionsGen.generate();
}

start();
