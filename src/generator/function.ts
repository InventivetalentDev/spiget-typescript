import { Generator } from "./generator";
import { Method } from "./swagger/method";
import { Parameter } from "./swagger/parameter";
import { WriteStream } from "fs";
import { convertSchemaType } from "./util";

export class FunctionGenerator extends Generator {
    private parameters: Parameter[];
    private pathParameters: string[];
    private queryParameters: string[];
    private hasPagination = false;
    private hasFields = false;
    private returnType = "any";
    private returnTypeBase = "any";
    private isArrayReturn = false;

    constructor(
        private name: string,
        private pathName: string,
        private method: Method,
        private stream: WriteStream
    ) {
        super("Function");
    }

    public generate() {
        this.info(`Converting ${this.name.toUpperCase()} into a function...`);

        // Write the description of the method
        this.write(`/**`);
        this.write(`${this.name.toUpperCase()} ${this.pathName}`);
        this.write(`${this.method.description}`);

        // Write the name of the method to be the function name
        const functionName = this.name.trim() + this.method.summary;

        // Generate each parameter of the method
        for (const parameter of this.method.parameters) {
            this.writeParameter(parameter);
        }

        this.write("**/");
        this.write(`${functionName}(${this.buildParameters()})`)

        // Write the return type of the method
        this.write(this.buildReturn());

        // Open the function
        this.write(` {`);

        // Write the content of the function
        this.write(`  return new ${this.returnType} ((resolve, reject) => {`);
        
        const addToQuery = (this.hasPagination || this.hasFields) ? "this.__addPaginationAndFieldsToQuery(pagination, fields)" : "{}";
        this.write(`    let query = ${addToQuery};`);

        for (const name of this.queryParameters) {
            this.write(`    query["${name}"] = ${name};`);
        }

        let replacedPath = this.pathName;
        for (const path of this.pathParameters) {
            replacedPath = replacedPath.replace(`{${path}}`, `" + ${path} + "`);
        }

        this.write(`    this.__request("${this.name.toUpperCase()}", "${replacedPath}", query).then(res${this.isArrayReturn ? "Arr" : ""} => {`);
        this.write(`      resolve(this.__mapType${this.isArrayReturn ? "List" : ""}(res${this.isArrayReturn ? "Arr" : ""}, ${this.returnTypeBase}));`)
        this.write(`    }).catch(reject);`);
        this.write(`  });`);

        // TODO Generate aliases functions that points towards the original function

        // TODO Close the function
        this.write(`}`);
    }

    private writeParameter(parameter: Parameter) {
        const name = parameter.name;
        // Ignored, handled by size
        if (name === "page" || name === "sort") {
            return;
        }
        if (name === "size") {
            this.hasPagination = true;
            this.parameters.push(parameter);
        } else if (name === "fields") {
            this.hasFields = true;
            this.parameters.push(parameter);
        } else {
            if (parameter.description !== undefined) {
                this.write(`@param\t${name}\t${parameter.description}`);
            }
            if (parameter.in === "path") {
                this.pathParameters.push(name);
            } else {
                this.queryParameters.push(name);
            }
            this.parameters.push(parameter);
        }
    }

    private buildParameters(): string {
        let result = "";
        let first = true;
        for (const parameter of this.parameters) {
            if (!first) {
                result += ", ";
            }
            if (parameter.name === "size") {
                result += "pagination: Pagination = undefined"
            } else if (parameter.name === "fields") {
                result += "fields: Fields = []";
            } else {
                let _type = convertSchemaType(parameter)[0];
                if (parameter.description !== undefined) {
                    if (_type === "number" && parameter.description.toLowerCase().indexOf("id") !== -1) {
                        _type = "Id";
                    } 
                }
                result += `${parameter.name}: ${_type}`
            }
            first = false;
        }
        return result;
    }

    private buildReturn(): string {
        let result = "";
        const responses = this.method.responses;
        if (responses === undefined) {
            return;
        }

        if (responses[200] === undefined) {
            return;
        }

        if (responses[200].schema === undefined) {
            return ": Promise<any>";
        }

        const schema = responses[200].schema;
        const _types = convertSchemaType(schema);
        let _type = _types[0];
        
        if (_type.startsWith("inline_response_")) {
            _type = "any";
            this.returnTypeBase = "any";
        } else {
            this.returnTypeBase = _types[1];
        }
        this.returnType = `Promise<${_type}`;
        result += `: ${this.returnType}`;
        this.isArrayReturn = schema.type === "array";

        return result;
    }

    private write(line: string) {
        this.stream.write(`${line}\n`);
    }

}

// TODO Get the path aliases from the original generator

export class FunctionAliasesGenerator extends Generator {

    constructor(
        private name: string
    ) {
        super("FunctionAliases");
    }

    public generate() {
        // TODO Write the comment of the aliases function
        // TODO Write the name of the function
        // TODO Write the parameters of the function
        // TODO Write the return that points to the original function
    }

}