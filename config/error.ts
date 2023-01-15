import { Response }  from 'express';

export interface Error{ error: string, message?: string }

export class ErrorHandler{
    private errors: Map<number, Error[]>;

    constructor() {
        this.errors = new Map();
    }

    public add(code: number, error: Error): void {
        if (this.errors.has(code)) {
            this.errors.get(code)?.push(error);
        } else {
            this.errors.set(code, [error]);
        }
    }

    public display(response: Response): void{
        this.errors.forEach((value: Error[], key: number) => {
            response.status(key).send(JSON.stringify(value));
        });
    }

    public hasError(): boolean { return this.errors.size > 0; }
}