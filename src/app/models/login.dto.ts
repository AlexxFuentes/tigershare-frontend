
export class CreateLoginDto {
    readonly email!: string;
    readonly pass!: string;

    constructor(email: string, pass: string) {
        this.email = email;
        this.pass = pass;
    }
}