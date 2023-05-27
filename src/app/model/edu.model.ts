
export class edu {

    id?: number;
    img: String;
    titulo: String;
    institucion: String;
    info:String;

    constructor(img: String, titulo: String, institucion: String, info:String){
        this.img = img;
        this.titulo = titulo;
        this.institucion = institucion;
        this.info = info;
    }
}