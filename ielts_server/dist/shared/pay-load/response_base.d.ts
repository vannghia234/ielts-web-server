export declare enum ResponseStatus {
    Success = "Success",
    Failure = "Failure"
}
export declare class ResponseBase {
    readonly id: string;
    readonly timestamp: Date;
    readonly apiVersion: string;
    readonly status: string;
    readonly message: string;
    readonly data: any;
    constructor(status: string, message: string, data?: any);
    protected toJSON(): any;
}
