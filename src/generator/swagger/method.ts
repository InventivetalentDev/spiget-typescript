import { Parameter } from "./parameter";
import { Schema } from "./schema";

/**
 * An interface that represents a method in the swagger file
 */
export interface Method {
    summary: string;
    description: string;
    parameters: Parameter[];
    responses?: MethodResponse
}

/**
 * An interface that represents a response of a method in the swagger file
 */
export interface MethodResponse {
    "200"?: {
        schema?: Schema
    }
}
