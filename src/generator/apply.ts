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
    private startIndex = NOT_FOUND;
    private endIndex = NOT_FOUND;

    // FIXME: Use one array to store the target content
    // Use the startLine and endLine to point to know how to devide the target content
    private startLines: string[] = [];
    private endLines: string[] = [];
    // private targetContent: string[] = [];

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
        private target: string
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

                // Add any line till we have a start point
                if (this.startIndex == NOT_FOUND) {
                    this.startLines.push(line);
                }
    
                // Add any line to the end after we have the end point
                if (this.endIndex != NOT_FOUND) {
                    this.endLines.push(line);
                }

                continue;
            }

            // Declare the start line
            if (filteredLine[4] === "G") {
                if (this.startIndex != NOT_FOUND) {
                    throw new Error("Too many start points!");
                }

                // FIXME: Since we are using two arraies no need to point the start line to anything for now
                this.startIndex = 0;

                continue;
            }

            // Declare the end line
            if (filteredLine[4] === "E") {
                if (this.endIndex != NOT_FOUND) {
                    throw new Error("Too many end points!");
                }

                // FIXME: Since we are using two arraies no need to point the end line to anything for now
                this.endIndex = 0;
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
        for (const line of this.startLines) {
            stream.write(line);
            stream.write("\n");
        }

        // TODO When the line is the start line
        
        const sourceStream = createReadStream(this.source, { encoding: 'utf8' });
        const source = createInterface({
            input: sourceStream
        });

        // Write the start point
        stream.write(this.startPoint);
        stream.write("\n");

        // Read from the source file and write it to the target
        for await (const line of source) {
            stream.write(line)
            stream.write("\n");
        }

        // Write the end point
        stream.write(this.endPoint);
        stream.write("\n");

        // When the source file is finished write the end point
        // Continue you writing from the target content ( stored in mem ) till the end
        for (const line of this.endLines) {
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
        join(SOURCE_DIR, "Spiget.ts")
    );
    functionsGen.generate();
}

start();
