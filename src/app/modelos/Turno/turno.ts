export class Turno {
    public especialidad:string;
    public medico:string;
    public horario:string;
    public pedidoEl:Date;
    public paciente:string;
    public pacienteEmail:string;
    public comentario?:string = '';
    public realizado?:boolean = false;
    public cancelado?:boolean = false;

}
