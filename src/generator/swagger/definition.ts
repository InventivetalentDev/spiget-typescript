import { Property } from "./property";

export interface Definition {
    type?: string;
    properties?: {[name: string]: Property | undefined};
}
