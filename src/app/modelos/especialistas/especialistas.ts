export class Especialistas {
    public nombre;
    public apellido;
    public edad;
    public dni;
    public fotoUno;
    public especialidad;
    public mail;
    public pass;
    public enabled;

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
