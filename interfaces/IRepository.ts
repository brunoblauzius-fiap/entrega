import {IDataBase} from "./IDataBase";
abstract class IRepository {
    constructor(readonly db: IDataBase) {}

    abstract getAll(params);
    abstract update(params, id : Number);
    abstract store(params);
    abstract delete(idPedido: Number);
    abstract findById(idPedido:Number);

}

export default IRepository;