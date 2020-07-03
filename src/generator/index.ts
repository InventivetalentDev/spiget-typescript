import { definitions } from "../../spiget-documentation/swagger.json";
import { Definition } from "./swagger/definition";
import { TypeGenerator } from "./type";

export function generator() {
    // Generate the type classes
    for (const name of Object.keys(definitions)) {
        const definition: Definition = definitions[name];

        const generator = new TypeGenerator(name, definition);
        generator.generate();
    }

    // TODO Generate the path functions
}
