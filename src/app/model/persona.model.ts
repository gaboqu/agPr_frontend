
export class persona {

    id?: number;
    nombre: String;
    url_foto: String;
    descripcion: String;
    email:String;
    password:String;
    frase1:String;
    frase2:String;

    constructor(nombre: String, url_foto: String, descripcion: String, email:String, password:String, frase1:String, frase2:String){
        this.nombre = nombre;
        this.url_foto = url_foto;
        this.descripcion = descripcion;
        this.email = email;
        this.password = password;
        this.frase1 = frase1;
        this.frase2 = frase2;
    }
}