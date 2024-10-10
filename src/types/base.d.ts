export interface ApiBaseResponse<T = any> {
    code: number;
    data: T;
    message: string;
}