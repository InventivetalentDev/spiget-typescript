export interface Method {
    summary: string;
    description: string;
    responses?: MethodResponse
}

export interface MethodResponse {
    "200"?: {
        schema?: string
    }
}
