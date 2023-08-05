export interface IResponseType {
    status: number,
    success: boolean,
    message: string,
    error?: any,
    data?: Array<any>
}