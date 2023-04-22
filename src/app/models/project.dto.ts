
export class CreateProjectDto {
    readonly token!: string;
    readonly nombre!: string;

    constructor(token: string, nombre: string) {
        this.token = token;
        this.nombre = nombre;
    }
}