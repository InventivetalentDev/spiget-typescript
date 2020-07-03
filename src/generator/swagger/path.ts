import { Method } from "./method";

export interface Path {
    [method: string]: Method;
}
