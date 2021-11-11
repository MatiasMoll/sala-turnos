
export class HorariosEsp {
    especialidad:string;
    fecha:Date;
    estaOcupado:boolean;

    constructor(f,eo,esp){
        this.especialidad = esp;
        this.fecha = f;
        this.estaOcupado = eo;
    }
}
