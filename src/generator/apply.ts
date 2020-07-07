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
    
    // Check if the next end placeholder is ours or not
    private isEndNext = false;

    constructor(

        /**
         * The name of start and end placeholder
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
        this.name = this.name.trim();

        if (this.name.length <= 0) {
            throw new Error("There's no name to find the placeholder in the target!");
        }
    }

    public async generate() {
        this.info(`Applying ${this.name} from ${this.source} to ${this.target}...`);
        try {
            await this.read();

            await this.apply();

            this.info(`Successfully! Applied ${this.name} from ${this.source} to ${this.target}.`);
        } catch (e) {
            this.error(`Failed to apply! ${e}`);
            
            // To log the stack trace of the error
            throw e;
        }
    }

    /**
     * Read the target file and store it in the memory
     */
    private async read() {
        this.info(`Reading from the ${this.target}...`);
        const stream = createReadStream(this.target, { encoding: 'utf8' });

        const lines = createInterface({
            input: stream
        });

        const min = Math.min(this.startPlaceholder.length, this.endPlaceholder.length);

        for await (const line of lines) {
            let filteredLine = line.trim();

            // Before doing any string operation let's check if the line content match our minimum length
            if (filteredLine.length < min)  {
                this.targetContent.push(line);
                continue;
            }

            if (!filteredLine.startsWith("/** ") && !filteredLine.endsWith(" */")) {
                this.targetContent.push(line);
                continue;
            }

            // Filter "/** " in the start
            filteredLine = filteredLine.substring(4);

            // Filter the end " */"
            filteredLine = filteredLine.substring(0, filteredLine.indexOf(" */"));

            // Declare the start line
            if (filteredLine.startsWith("Generated: ")) {

                // "Generated: ".length
                filteredLine = filteredLine.substring(11);

                // Check the name
                if (filteredLine == this.name) {
                    if (this.startIndex != NOT_FOUND) {
                        throw new Error("Too many start placeholders!");
                    }

                    this.info("[!] Found the start placeholder!");
                    this.startIndex = this.targetContent.length;
                    this.isEndNext = true;
                    continue;
                }

            } else if (filteredLine === "End Generated" && this.isEndNext && this.endIndex == NOT_FOUND) { // Declare the end placeholder
                this.info("[!] Found the end placeholder!");
                this.endIndex = this.targetContent.length;
                this.isEndNext = false;
                continue;
            }

            // When the place holder is not what we are looking for
            this.targetContent.push(line);
        }

        if (this.startIndex == NOT_FOUND) {
            throw new Error("No start placeholder found!");
        }

        stream.close();
    }

    /**
     * Where the magic happens
     */
    private async apply() {
        // Rewrite the target file
        const stream = createWriteStream(this.target, { encoding: 'utf8' });
    
        this.info(`Writing the start part of ${this.target}...`);
        // Write from the target content ( stored in mem )
        for (let i = 0; i < this.startIndex; i++) {
            const line = this.targetContent[i];
            stream.write(line);
            stream.write("\n");
        }
        
        this.info(`Applying ${this.source} in the middle of ${this.target}...`);
        const sourceStream = createReadStream(this.source, { encoding: 'utf8' });
        const source = createInterface({
            input: sourceStream
        });

        // Write the start placeholder
        stream.write(this.prefix);
        stream.write(this.startPlaceholder);
        stream.write("\n\n");

        // Read from the source file and write it to the target
        for await (const line of source) {
            stream.write(this.prefix);
            stream.write(line)
            stream.write("\n");
        }

        // Write the end placeholder
        stream.write(this.prefix);
        stream.write(this.endPlaceholder);
        stream.write("\n");

        this.info(`Writing the end part of ${this.target}...`);
        // When the source file is finished write the end placeholder
        // Continue you writing from the target content ( stored in mem ) till the end
        for (let i = this.endIndex; i < this.targetContent.length; i++) {
            const line = this.targetContent[i];
            stream.write(line);
            stream.write("\n");
        }

        stream.close();
        this.info(`Saving ${this.target}...`);

        // Finish after saving everything in the stream
        return new Promise((resolve) => {
            stream.on("finish", () => {
                this.info(`Saved! ${this.target}`);
                resolve()
            });
        });
    }
    
    private comment(value: string): string{
        return `/** ${value} */`;
    }

    private get startPlaceholder() {
        return this.comment(`Generated: ${this.name}`);
    }

    private get endPlaceholder() {
        return this.comment(`End Generated`);
    }

}

export async function start() {
    const importsGen = new ApplyGenerator(
        "Imports",
        join(GENERATED_TYPES_DIR, "_imports.txt"),
        join(SOURCE_DIR, "Spiget.ts")
    );
    await importsGen.generate();

    const functionsGen = new ApplyGenerator(
        "Functions",
        join(GENERATED_TYPES_DIR, "_functions.ts"),
        join(SOURCE_DIR, "Spiget.ts"),
        "    "
    );
    await functionsGen.generate();
}

start();
