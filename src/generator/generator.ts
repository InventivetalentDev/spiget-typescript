export abstract class Generator {

    constructor(
        private logName: string
    ) {}

    info(message: string) {
        this.print("INFO", message);
    }

    warn(message: string) {
        this.print("WARN", message);
    }

    error(message: string) {
        this.print("ERR", message);
    }

    debug(message: string) {
        this.print("DEBUG", message);
    }

    private print(prefix: string, message: string) {
        console.log(`[Generator:${this.logName}:${prefix}] `, message)
    }

    abstract generate(): void;
}
