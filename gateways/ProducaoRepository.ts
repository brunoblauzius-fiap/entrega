import IRepository from "../interfaces/IRepository";
import Produto from '../entity/producao';
import { IDataBase } from "../interfaces/IDataBase";
import Producao from '../entity/producao';

class ProducaoRepository implements IRepository{
    
    public db: IDataBase;
    private nomeTabela = "producao";

    constructor(database: IDataBase) {
        this.db = database;
      }

    public getAll = async (params: any) => {
        let CONDITIONS = false;
        let result;
        if (typeof params.idPedido != 'undefined' && params.idPedido != "") {
            CONDITIONS = true;
        }

        if (!CONDITIONS) {
            return await this.db.find(
                this.nomeTabela,
                null,
                null
            );
        } else{
            return await this.db.find(
                this.nomeTabela,
                null,
                [{ campo: "idPedido", valor: params.idPedido }]);
        }
    }

    public store = async(producao: Producao) => {
        let data = await this.db.store(
            this.nomeTabela,
            [{ campo: "idPedido", valor: producao.idPedido }, 
            { campo: "entradaCozinha", valor:  new Date() },
            { campo: "saidaCozinha", valor: null },
            { campo: "created", valor:  new Date()}, 
            ]);
                return new Producao(
                    producao.idPedido,
                    new Date(),
                    null,
                    parseInt(data.insertId)
        );
    }

    public update = async (producao: Producao, id: Number) => {
        this.db.update(
            this.nomeTabela,
            [{ campo: "idPedido", valor: producao.idPedido }, 
            { campo: "saidaCozinha", valor: new Date() },
            { campo: "modified", valor:  new Date()}],
            [{ campo: "id", valor: id }]);  
        return "Pedido alterado para pronto."
    }

    public delete = async (id: Number) => {
        let response = await this.db.delete(
            this.nomeTabela,
            [{ campo: "id", valor: id }]);
        return "Pedido excluído com sucesso."
    }

    public findById = async (id: Number) => {
        let data = await this.db.find(
            this.nomeTabela,
            null,
            [{ campo: "idPedido", valor: id }]);
        if (data.length>0) {
            console.log(data)
            return data;
        } else {
            return [];
        }
    }
 
}

export default ProducaoRepository;