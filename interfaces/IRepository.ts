import {IDataBase} from "./IDataBase";
abstract class IRepository {
    constructor(readonly db: IDataBase) {}

    abstract getAll(params);
    abstract update(params, idPedido);
    abstract store(params);
    abstract delete(idPedido);
    abstract findById(idPedido);

}

export default IRepository;