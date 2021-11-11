export class Administradores {
    public nombre;
    public apellido;
    public edad;
    public dni;
    public fotoUno;
    public mail;
    public pass;
    public idDocumento = null;
  

    constructor(n,ln,a,d,po,m,p){
        this.nombre = n;
        this.apellido = ln;
        this.edad = a;
        this.dni = d;
        this.fotoUno = po;
        this.mail = m;
        this.pass = p;
 
    }
}
