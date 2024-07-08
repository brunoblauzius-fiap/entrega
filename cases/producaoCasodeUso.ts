import Producao from '../entity/producao';
import IRepository from '../interfaces/IRepository';
import BadRequestError from '../application/exception/BadRequestError';
import { number } from 'yargs';

export class ProducaoCasoDeUso{

    static async getAllPedidos(request, ProducaoRepositorio: IRepository){
        const pedidos = await ProducaoRepositorio.getAll(request);
        return pedidos;
    }

    static async sendProducao(request, ProducaoRepositorio: IRepository, idPedido?){
        let producaoData
        if (idPedido=== null)
            producaoData = await ProducaoRepositorio.findById(request.body.idPedido);
        else
            producaoData = await ProducaoRepositorio.findById(idPedido);


        if (producaoData.length > 0) {
            throw new BadRequestError("Pedido já em produção.");
        }

        let producao = new Producao(
            idPedido=== null? request.body.idPedido: idPedido
            );
            
            try {
                let data = await ProducaoRepositorio.store(producao);
                return data;
            } catch(err) {
            throw new Error(err.message)
            }
    }
    static async atualizarPedidoProducao(request,ProducaoRepositorio: IRepository){
        try {

           let response=await this.encontrarPedidoPorId(request.params.idPedido,ProducaoRepositorio)

            const producao = new Producao(
                request.params.idPedido,
                response[0].entradaCozinha,
                response[0].saidaCozinha,
                response[0].id
            );

             let data = await ProducaoRepositorio.update(producao, response[0].id);
             return data;
         } catch (err) { throw new Error(err.message)}

    }
    static async encontrarPedidoPorId(idPedido, ProducaoRepositorio: IRepository){
        return await ProducaoRepositorio.findById(idPedido);
    }

    static async deleteProduto(idPedido, ProducaoRepositorio: IRepository){
                const Produto = await ProducaoRepositorio.delete(idPedido);
        return Produto;
    }

}