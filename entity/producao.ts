import { isNumberObject } from "util/types";
import BadRequestError from "../application/exception/BadRequestError";

class Producao{
    constructor (
        readonly idPedido: Number, 
        readonly entradaCozinha?,
        readonly saidaCozinha?,
        readonly id?
    ) {
        if (idPedido == null) {
            throw new BadRequestError("O idPedido é requerido.");
        }
    }

}

export default Producao;