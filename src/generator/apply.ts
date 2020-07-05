import { Generator } from "./generator";

/**
 * Takes source with code and apply it to the target
 */
class ApplyGenerator extends Generator {

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

    public generate() {
        this.read();

        this.apply();
    }

    /**
     * Read the target file and store it in the memory
     */
    private read() {
        // TODO Implement the function
    }

    /**
     * Where the magic happens
     */
    private apply() {
        // TODO Rewrite the target file
        // TODO Write from the target content ( stored in mem )
        // TODO When the line is the start line
        // TODO Read from the source file and write it to the target
        // TODO When the source file is finished write the end point
        // TODO Continue you writing from the target content ( stored in mem ) till the end
    }

    private get startPoint() {
        return `Generated: ${this.name}`
    }

    private get endPoint() {
        return `End Generated`;
    }

}

export function start() {

}

start();
