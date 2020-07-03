import { Definition } from "./swagger/definition";
import { Generator } from "./generator";
import { Property } from "./swagger/property";
import { convertPropertyType, buildWithNewLines, GENERATED_TYPES_DIR } from "./util";
import { join } from "path";
import { createWriteStream } from "fs";

const staticImport = [
    `import Spiget, {Id} from "../Spiget"`,
    `import SpigetType from "../SpigetType"`
];

export class TypeGenerator extends Generator {
    private imports = staticImport;
    private content: string[];
    private _constructor: string[];

    constructor(
        private name: string,
        private definition: Definition
    ) {
        super("Type");
        // Initialize the class
        this.content.push(`export class ${name} extends SpigetType {`);

        // Initialize the class constructor
        this._constructor.push(`  constructor(source: any, spiget: Spiget = new Spiget()) {`);
        this._constructor.push(`    super(source, spiget);`);
        this._constructor.push(`    if (source !== undefined) {`);
    }

    public generate() {
        this.info("Generating...");

        // For each property and implement it in the content of the class
        for (const name of Object.keys(this.definition.properties)) {
            const property = this.definition.properties[name];
            if (property !== undefined) {
                this.warn(`${name} has no properties!`);
                continue;
            }

            this.generateProperty(name, property);
        }

        this._constructor.push(`    }`);
        this._constructor.push(`  }`);

        this.content.push(`\n${buildWithNewLines(this._constructor)}`);
        this.content.push("}");
        this.content.push(`export default ${name};`);

        // TODO Generate an implementation of this type

        // Write everything into the generated file
        this.save();
    }

    private generateProperty(name: string, property: Property) {
        // Check if the property has a description and if so include it as comment
        if (property.description !== undefined) {
            this.content.push(`  /** ${property.description} **/`);
        }

        // Check if it's a number and assume the type is Id ( which is a number by the way )
        const convertedTypes = convertPropertyType(property);
        let _type = convertedTypes[0];

        if (_type === "number" && (name === "id" || (property.description !== undefined && property.description.toLowerCase().indexOf("id") !== -1))) {
            _type = "Id";
        }

        // Write the property with the type
        this.writeProperty(name, _type);

        // Write the check if the property exists in the source during construction of the class
        this.writeConstructorChecker(name, property, convertedTypes);

        // Check if there's any required imports to implement
        this.writeImports(convertedTypes);
    }

    private writeProperty(name: string, _type: string) {
        // Write the property name and its type in the content
        this.content.push(` ${name}: ${_type};`);
    }

    private writeConstructorChecker(name: string, property: Property, _types: string[]) {
        // Write the if statement to check if the property name exists in the source
        let checker = `      if (source.hasOwnProperty("${name}"))`;
        checker += ` this.${name} = `;
        
        // If so we will take that object and reference it in this object instead of the source object
        if (_types.length > 1 && _types[1] !== undefined) {
            if (property.type === "array") {
                checker += `this._spiget.__mapTypeList(source.${name}, ${_types[1]});`
            } else {
                checker += `this._spiget.__mapType(source.${name}, ${_types[1]});`
            }
        } else {
            checker += `source.${name};`
        }

        this._constructor.push(checker);
    }

    private writeImports(_types: string[]) {
        // Check if there's any required imports to add it
        if (_types.length <= 0 || _types[1] === undefined) {
            return;
        }

        // Write it to the imports array
        const _import = `import ${_types[1]} from "../types/${_types[1]}";`
            
        if (this.imports.indexOf(_import) !== -1) {
            return;
        }

        this.imports.push(_import);
    }

    private save() {
        const path = join(GENERATED_TYPES_DIR, `${name}Base.ts`);
        const stream = createWriteStream(path, { encoding: "utf8" });

        // Write the imports in the file
        stream.write(`${buildWithNewLines(this.imports)}\n`);
        // Write the class contents in the file
        stream.write(`${buildWithNewLines(this.content)}`);

        stream.close();
    }

}
