// Берем исходный класс ошибки в TS и extend'им его
export class HTTPError extends Error {
    statusCode: number;
    context?: string;

    constructor(statusCode: number, message: string, context?: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.context = context;
    }
}