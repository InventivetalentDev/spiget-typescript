import { Parameter } from "./parameter";
import { Schema } from "./schema";

export interface Method {
    summary: string;
    description: string;
    parameters: Parameter[];
    responses?: MethodResponse
}

export interface MethodResponse {
    "200"?: {
        schema?: Schema
    }
}
