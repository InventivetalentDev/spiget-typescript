import { Method } from "./method";

/**
 * An interface that represents a path in the swagger file
 */
export interface Path {
    [method: string]: Method;
}
