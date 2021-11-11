export class Pacientes {
    public nombre;
    public apellido;
    public edad;
    public dni;
    public fotoUno;
    public fotoDos;
    public obraSocial;
    public mail;
    public pass;
    public idDocumento = null;


    

    constructor(n,ln,a,d,po,pt,os,m,p){
        this.nombre = n;
        this.apellido = ln;
        this.edad = a;
        this.dni = d;
        this.fotoUno = po;
        this.fotoDos = pt;
        this.obraSocial = os;
        this.mail = m;
        this.pass = p;
    }


}
