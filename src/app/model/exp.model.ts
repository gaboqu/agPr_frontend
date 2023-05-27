
export class exp {

    id?: number;
    url_logo_exp: String;
    empresa: String;
    fechas_ing_egr: String;
    funciones:String;

    constructor(url_logo_exp: String, empresa: String, fechas_ing_egr: String, funciones:String){
        this.url_logo_exp = url_logo_exp;
        this.empresa = empresa;
        this.fechas_ing_egr = fechas_ing_egr;
        this.funciones = funciones;
    }
}