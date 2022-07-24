export class CustomResponse {
    constructor() {
    }

    success: boolean;
    data: object;
    message: string;
    errors: string[]
    validations: string[]
}
