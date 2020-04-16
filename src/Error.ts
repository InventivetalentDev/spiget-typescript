export class Error {
    code: number;
    error: string;

    constructor(source: any) {
        this.error = source.error
    }
}
export default Error;
