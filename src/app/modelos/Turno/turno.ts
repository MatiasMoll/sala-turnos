import { Especialistas } from "../especialistas/especialistas";
import { Historia } from "../historia/historia";
import { Pacientes } from "../pacientes/pacientes";

export class Turno {
    public especialidad:string;
    public medico:Especialistas;
    public horario:string;
    public pedidoEl:Date;
    public paciente:Pacientes;
    public pacienteEmail:string;
    public medicoEmail:string;
    public comentario:string = '';
    public estado:EstadoTurno = EstadoTurno.Pedido;
    public idDocumento = null;
    public historia:Historia;

}


export enum EstadoTurno {
  Rechazado = 'Rechazado',
  Cancelado = 'Cancelado',
  Aceptado = 'Aceptado',
  Realizado = 'Realizado',
  Pedido = 'Pedido',
  Finalizado = 'Finalizado'
}
