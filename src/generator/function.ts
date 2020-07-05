import { Generator } from "./generator";
import { Method } from "./swagger/method";
import { Parameter } from "./swagger/parameter";
import { WriteStream } from "fs";
import { camelize } from "./util";

/**
 * A common class that includes functions that both function and function aliases generator have
 */
export abstract class AbstractFunctionGenerator extends Generator {

    constructor(
        name: string,
        protected stream: WriteStream
    ) {
        super(name);
    }

    /**
     * Takes a line and writes it to the stream with a new line
     *
     * @param line The line to add the new line to it
     */
    protected write(line: string) {
        this.stream.write(`${line}\n`);
    }

    abstract generate(): void;
}

/**
 * Generate a function out of swagger path
 */
export class FunctionGenerator extends AbstractFunctionGenerator {
    private parameters: Parameter[] = [];
    private pathParameters: string[] = [];
    private queryParameters: string[] = [];
    private hasPagination = false;
    private hasFields = false;
    private returnType = "Promise<any>";
    private returnTypeBase = "any";
    private isArrayReturn = false;

    constructor(
        private name: string,
        private pathName: string,
        private method: Method,
        stream: WriteStream
    ) {
        super("Function", stream);
    }

    /**
     * Generate the function
     */
    public generate() {
        this.info(`Converting [${this.name.toUpperCase()}] ${this.pathName} into a function...`);

        // Write the description of the method
        this.write(`/** `);
        this.write(`${this.name.toUpperCase()} ${this.pathName}`);
        this.write(`${this.method.description}`);

        // Write the name of the method to be the function name
        const functionName = camelize(this.name.trim() + this.method.summary);

        // Generate each parameter of the method
        for (const parameter of this.method.parameters) {
            this.writeParameter(parameter);
        }

        this.write("**/");

        const inputParameters = this.buildParameters();
        const returnOutput = this.buildReturn()

        // Write the header of the function
        this.write(`${functionName}(${inputParameters})${returnOutput} {`)

        // Write the content of the function
        this.write(`  return new ${this.returnType}((resolve, reject) => {`);

        // Check if we should add the pagination or the fields during the intiailiztion of the query
        const addToQuery = (this.hasPagination || this.hasFields) ? "this.__addPaginationAndFieldsToQuery(pagination, fields)" : "{}";
        this.write(`    let query = ${addToQuery};`);

        // Write each query and their value
        for (const name of this.queryParameters) {
            this.write(`    query["${name}"] = ${name};`);
        }

        // Replace each path in their string form and implement them as variable
        let replacedPath = this.pathName;
        for (const path of this.pathParameters) {
            replacedPath = replacedPath.replace(`{${path}}`, "${" + path + "}");
        }

        // Write the request call of the function
        this.write(`    this.__request("${this.name.toUpperCase()}", \`${replacedPath}\`, query).then(res${this.isArrayReturn ? "Arr" : ""} => {`);
        if (this.returnTypeBase === "any") {
            this.write(`      resolve(res);`)
        } else {
            this.write(`      resolve(this.__mapType${ this.isArrayReturn ? "List" : "" }(res${ this.isArrayReturn ? "Arr" : "" }, ${ this.returnTypeBase }));`)
        }
        this.write(`    }).catch(reject);`);
        this.write(`  });`);

        // Close the function
        this.write(`}\n\n`);

        // Check if the function has aliases and generate them
        if (pathAliases[functionName] !== undefined) {
            const aliasesGenerator = new FunctionAliasesGenerator(
                pathAliases[functionName],
                functionName,
                inputParameters,
                returnOutput,
                this.parameters,
                this.stream
            );
            aliasesGenerator.generate();
        }
    }

    /**
     * Seperate each parameter into query or path and write them in array
     */
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

    /**
     * Build the parameters of the function
     */
    private buildParameters(): string {
        let result = "";
        let first = true;
        for (const parameter of this.parameters) {
            if (!first) {
                result += ", ";
            }
            if (parameter.name === "size") {
                result += "pagination?: Pagination"
            } else if (parameter.name === "fields") {
                result += "fields: Fields = []";
            } else {
                let _type = this.convertSchemaType(parameter)[0];
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

    /**
     * Build the return type of the function
     */
    private buildReturn(): string {
        let result = "";
        const responses = this.method.responses;
        if (responses === undefined) {
            return "";
        }

        if (responses[200] === undefined) {
            return "";
        }

        if (responses[200].schema === undefined) {
            return ": Promise<any>";
        }

        const schema = responses[200].schema;
        const _types = this.convertSchemaType(schema);
        let _type = _types[0];

        if (_type.startsWith("inline_response_")) {
            _type = "any";
            this.returnTypeBase = "any";
        } else {
            this.returnTypeBase = _types[1];
        }
        this.returnType = `Promise<${_type}>`;
        result += `: ${this.returnType}`;
        this.isArrayReturn = schema.type === "array";

        return result;
    }

}

/**
 * Path aliases and their original path
 */
const pathAliases = {
    "getAuthorDetails": "getAuthor",
    "getAuthorList": "getAuthors",
    "getCategoryList": "getCategories",
    "getCategoryDetails": "getCategory",
    "getResourceList": "getResources",
    "getResourceDetails": "getResource",
    "getFreeResourceList": "getFreeResources",
    "getPremiumResourceList": "getPremiumResources"
};

/**
 * Generate an alias function using the original path function data
 */
export class FunctionAliasesGenerator extends AbstractFunctionGenerator {

    constructor(
        private name: string,
        private functionName: string,
        private parameters: string,
        private returnString: string,
        private invokeParameters: Parameter[],
        stream: WriteStream
    ) {
        super("FunctionAliases", stream);
    }

    /**
     * Generate the function
     */
    public generate() {
        this.info(`Creating an alias of ${this.functionName} called ${this.name}`);

        // Write the comment of the function
        this.write("/**");
        this.write(`Alias of ${this.functionName}`);
        this.write("**/");

        // Write the name and the parameters of the function
        this.write(`${this.name}(${this.parameters})${this.returnString} {`);

        // Write the return that points to the original function
        this.write(`  return this.${this.functionName}(${this.buildInvokeParameters()});`);
        this.write(`}\n`);
    }

    /**
     * Combine all the parameters into
     */
    private buildInvokeParameters(): string {
        let result = "";
        for (let i = 0; i < this.invokeParameters.length; i++) {
            if (i > 0) {
                result += ",";
            }
            const name = this.invokeParameters[i].name;
            if (name === "size") {
                result += "pagination";
                continue;
            }
            result += name;
        }
        return result;
    }

}
