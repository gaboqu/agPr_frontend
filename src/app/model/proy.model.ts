
export class proy {

    id?: number;
    img: String;
    url: String;
    titulo: String;
    tecnologias:String;
    info:String;

    constructor(img: String, url: String, titulo: String, tecnologias:String, info:String){
        this.img = img;
        this.url = url;
        this.titulo = titulo;
        this.tecnologias = tecnologias;
        this.info = info;
    }
}