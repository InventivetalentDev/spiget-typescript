import { Generator } from "./generator";
import { Method } from "./swagger/method";

export class FunctionGenerator implements Generator {

    constructor(
        private name: string,
        private method: Method
    ) {}

    public generate() {
        // TODO Write the description of the method
        // TODO Write the name of the method to be the function name
        // TODO Generate each parameter of the method
        // TODO Write the return type of the method
        // TODO Open the function
        // TODO Write the content of the function
        // TODO Close the function
    }

}

// TODO Get the path aliases from the original generator

export class FunctionAliasesGenerator implements Generator {

    constructor(
        private name: string
    ) {}

    public generate() {
        // TODO Write the comment of the aliases function
        // TODO Write the name of the function
        // TODO Write the parameters of the function
        // TODO Write the return that points to the original function
    }

}