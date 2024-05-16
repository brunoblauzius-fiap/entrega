import { ParametroBd } from "../types";
export interface IDataBase {
    //public connection = null;

    store(query, string, data?: any);
    update(nomeTabela: string, campos: ParametroBd[], where: ParametroBd[]);
    delete(nomeTabela: string, parametros: ParametroBd[]);
    find(nomeTabela: string, campos: string[] | null, parametros: ParametroBd[]);
    query(query: string);
}

//export default IDataBase;