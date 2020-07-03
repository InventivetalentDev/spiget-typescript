export abstract class Generator {

    constructor(
        private logName: string
    ) {}

    protected info(message: string) {
        this.print("INFO", message);
    }

    protected warn(message: string) {
        this.print("WARN", message);
    }

    protected error(message: string) {
        this.print("ERR", message);
    }

    protected debug(message: string) {
        this.print("DEBUG", message);
    }

    private print(prefix: string, message: string) {
        console.log(`[Generator:${this.logName}:${prefix}] `, message)
    }

    abstract generate(): void;
}
