
export class CreateUserDto {
    readonly nombre!: string;
    readonly apellido!: string;
    readonly user!: string;
    readonly email!: string;
    readonly pass!: string;
    readonly plan!: string;
    readonly fnan!: Date;

    constructor(nombre: string, apellido: string, user: string, email: string, pass: string, plan: string, fnan: Date) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.user = user;
        this.email = email;
        this.pass = pass;
        this.plan = plan;
        this.fnan = fnan;
    }
}