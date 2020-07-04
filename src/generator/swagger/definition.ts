import { Property } from "./property";

/**
 * An interface the represents a definition in the swagger file
 */
export interface Definition {
    type?: string;
    properties?: {[name: string]: Property | undefined};
}
