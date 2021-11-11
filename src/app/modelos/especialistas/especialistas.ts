import { HorariosEsp } from "../horariosEsp/horarios-esp";

export class Especialistas {
    public nombre;
    public apellido;
    public edad;
    public dni;
    public fotoUno;
    public especialidad = {especialidad:'',foto:''};
    public mail;
    public pass;
    public enabled;
    public idDocumento = null;
    public diasLaborales = [
        {
            esp:'',
            horarioLunes:{horaInicio:'',horaFinal:''},
            horarioMartes:{horaInicio:'',horaFinal:''},
            horarioMiercoles:{horaInicio:'',horaFinal:''},
            horarioJueves:{horaInicio:'',horaFinal:''},
            horarioViernes:{horaInicio:'',horaFinal:''},
            horarioSabado:{horaInicio:'',horaFinal:''}
        }
    ];
    public horaiosLaborales = new Array<string>();

    constructor(n,ln,a,d,po,e,m,p,en){
        this.nombre = n;
        this.apellido = ln;
        this.edad = a;
        this.dni = d;
        this.fotoUno = po;
        this.especialidad = e;
        this.mail = m;
        this.pass = p;
        this.enabled = en;
    }
}

/* public diasLaborales = [
        {
            esp:'',
            dias:[
                {
                    diaSemana: '',
                    horainicio:'',
                    horaFinal:''
                }
            ]
        }
    ];*/