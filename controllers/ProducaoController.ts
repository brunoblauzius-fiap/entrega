import * as HttpStatus from 'http-status';
import ProducaoRepository from "../gateways/ProducaoRepository";
import ResponseAPI from '../adapters/ResponseAPI';
import { IDataBase } from '../interfaces/IDataBase';
import { ProducaoCasoDeUso } from '../cases/producaoCasodeUso';
import BadRequestError from '../application/exception/BadRequestError';
import ResponseErrors from '../adapters/ResponseErrors';
import PedidoService from '../external/Services/PedidoService';


class ProducaoController {
     /**
      * 
      */
     constructor(
        readonly repository: ProducaoRepository,
        readonly _pedidoService: PedidoService
    ) {}
 
     /**
      * 
      * @param request 
      * @param response 
      */
     public all = async (request, response) => {
         try {
             let data = await ProducaoCasoDeUso.getAllPedidos(request.query,this.repository);
             response.status(HttpStatus.OK).json(ResponseAPI.list(data));
         } catch(err) {
            ResponseErrors.err(response, err);
         }
     }

     /**
      * 
      * @param request 
      * @param response 
      */
     public store = async (request, response) => {
        try {
            const data = await ProducaoCasoDeUso.sendProducao(request,this.repository);
            response.status(HttpStatus.CREATED).json(ResponseAPI.data(data));

        } catch(err) {
            ResponseErrors.err(response, err);
        }
     }
 
     /**
      * 
      * @param request 
      * @param response 
      */
     public update = async (request, response) => {
        try {
            const data = await ProducaoCasoDeUso.atualizarPedidoProducao(request,this.repository);
            await this._pedidoService.setStatusPedido(request.params.idPedido);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));
        } catch(err) {
            ResponseErrors.err(response, err);
        }
        
     }
 
     /**
      * 
      * @param request 
      * @param response 
      */
     public show = async (request, response) => {
         try {
             if (typeof request.params.idPedido == 'undefined') {
                 throw new BadRequestError("ID do pedido é requerido.");
             }
             let data = await ProducaoCasoDeUso.encontrarPedidoPorId(request.params.idPedido,this.repository);
             response.status(HttpStatus.OK).json(ResponseAPI.data(data));
         } catch (err) {
            ResponseErrors.err(response, err);
         }
     }
 
     /**
      * 
      * @param request 
      * @param response 
      */
     public delete = async (request, response) => {
         try {
            if (typeof request.params.idPedido == 'undefined') {
                throw new BadRequestError("ID do pedido é requerido.");
            }
             await ProducaoCasoDeUso.deleteProduto(request.params.idPedido, this.repository);
             response.status(HttpStatus.NO_CONTENT).json({});
         } catch (err) {
            ResponseErrors.err(response, err);
         }
     }
}

export default ProducaoController;