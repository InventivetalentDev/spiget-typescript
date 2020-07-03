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