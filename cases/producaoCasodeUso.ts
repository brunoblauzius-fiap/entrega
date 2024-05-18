import Producao from '../entity/producao';
import IRepository from '../interfaces/IRepository';
import BadRequestError from '../application/exception/BadRequestError';
import { number } from 'yargs';

export class ProducaoCasoDeUso{

    static async getAllPedidos(request, ProducaoRepositorio: IRepository){
        const pedidos = await ProducaoRepositorio.getAll(request);
        return pedidos;
    }

    static async sendProducao(request, ProducaoRepositorio: IRepository){
        let producaoData = await ProducaoRepositorio.findById(request.body.idPedido);
        if (producaoData != null) {
            throw new BadRequestError("Pedido já em produção.");
        }

        let producao = new Producao(
            request.body.idPedido
        );
            
        let data = await ProducaoRepositorio.store(producao);
        return data;
    }

    static async atualizarPedidoProducao(request,ProducaoRepositorio: IRepository){
        let producaoData = await ProducaoRepositorio.findById(request.body.idPedido);
            
        if (producaoData == null) {
            throw new BadRequestError("Pedido não encontrado.");
        }

    
        const producao = new Producao(
            request.params.idPedido
        );

        let data = await ProducaoRepositorio.update(producao, request.params.idPedido);
        return data;

    }
    static async encontrarPedidoPorId(idPedido, ProducaoRepositorio: IRepository){
        return await ProducaoRepositorio.findById(idPedido);
    }

    static async deleteProduto(idPedido, ProducaoRepositorio: IRepository){
                const Produto = await ProducaoRepositorio.delete(idPedido);
        return Produto;
    }

}