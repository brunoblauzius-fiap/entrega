import { describe } from 'node:test';
import { format } from 'date-fns';
import { expect, test, it, jest } from '@jest/globals';
import ProducaoController from '../../controllers/ProducaoController';
import ProducaoRepository from '../../gateways/ProducaoRepository';
import mockDataBase from '../mockDatabase/MockDataBase';
import { Request, Response } from 'express';
import mockPedidoService from '../mockDatabase/mockPedidoServiceOK';
import { mockRequest, mockResponse } from 'jest-mock-req-res';



const controller = new ProducaoController(
    new ProducaoRepository(mockDataBase),
    mockPedidoService
) 


describe("Produção Controller Testes", () => {
  
    test("Buscar todos os registros.",  async  () => { 
        const req = mockRequest({ query: { } });
        const res = mockResponse();       
        await controller.all(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ 
            "results": [ 
                    {
                        "id": 1,
                        "idPedido": 33262665,
                    },
                    {
                        "id": 2,
                        "idPedido": 32226599,
                    },
                ],   
                "totals": 2,
            });
    });

    test("Cadastrar validar pedido já cadastrado.",  async  () => { 
        let idPedido = 33262665;
        const req = mockRequest({ body: { idPedido: idPedido } });
        const res = mockResponse();  
        await controller.store(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            "message" : {
                "non_field_error": [
                    "Pedido já em produção.",
                ]
            }
        });
    });

    test("Cadastrar novo pedido.",  async  () => { 
        let idPedido = "3326290";
        const req = mockRequest({ body: { idPedido: idPedido } });
        const res = mockResponse();  
        mockDataBase.find = jest.fn().mockReturnValue([]);
        const controller = new ProducaoController(
            new ProducaoRepository(mockDataBase),
            mockPedidoService
        )

        await controller.store(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            "id": 1,
            "entradaCozinha": format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            "idPedido": idPedido,
            "saidaCozinha": null,
        });
    });


    test("Atualizar pedido.",  async  () => { 
        let idPedido = "3326290";
        const req = mockRequest({ params: { idPedido: idPedido } });
        const res = mockResponse();  
        mockDataBase.find = jest.fn().mockReturnValue([
            {
                "id" : 1,
                "idPedido": idPedido,
                "entradaCozinha": format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                "saidaCozinha": null,
            }
        ]);
        const controller = new ProducaoController(
            new ProducaoRepository(mockDataBase),
            mockPedidoService
        )
        await controller.update(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith("Pedido alterado para pronto.");
    });


    test("Atualizar pedido não encontrado.",  async  () => { 
        let idPedido = "3326290";
        const req = mockRequest({ params: { idPedido: idPedido } });
        const res = mockResponse();  
        mockDataBase.find = jest.fn().mockReturnValue([]);
        const controller = new ProducaoController(
            new ProducaoRepository(mockDataBase),
            mockPedidoService
        )
        await controller.update(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            "message" : {
                "non_field_error": [
                    "Pedido não encontrado.",
                ]
            }
        });
    });


    test("Recuperar pedido 3326291.",  async  () => { 
        let idPedido = "3326291";
        const req = mockRequest({ params: { idPedido: idPedido } });
        const res = mockResponse();  
        mockDataBase.find = jest.fn().mockReturnValue([
            {
                "id" : 1,
                "idPedido": idPedido,
                "entradaCozinha": format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                "saidaCozinha": null,
            }
        ]);
        const controller = new ProducaoController(
            new ProducaoRepository(mockDataBase),
            mockPedidoService
        )
        await controller.show(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            "id" : 1,
            "idPedido": idPedido,
            "entradaCozinha": format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            "saidaCozinha": null,
        });
    });

    test("Validar se existe idPedido nos parametros atualizar.",  async  () => { 
        let idPedido = "3326291";
        const req = mockRequest({ params: { } });
        const res = mockResponse();  
        mockDataBase.find = jest.fn().mockReturnValue([
            {
                "id" : 1,
                "idPedido": idPedido,
                "entradaCozinha": format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                "saidaCozinha": null,
            }
        ]);
        const controller = new ProducaoController(
            new ProducaoRepository(mockDataBase),
            mockPedidoService
        )
        await controller.show(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            "message" : {
                "non_field_error": [
                    "ID do pedido é requerido."
                ]
            }
        });
    });

    test("Validar se existe idPedido nos parametros deletar.",  async  () => { 
        let idPedido = "3326291";
        const req = mockRequest({ params: { } });
        const res = mockResponse();  
        mockDataBase.find = jest.fn().mockReturnValue([
            {
                "id" : 1,
                "idPedido": idPedido,
                "entradaCozinha": format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                "saidaCozinha": null,
            }
        ]);
        const controller = new ProducaoController(
            new ProducaoRepository(mockDataBase),
            mockPedidoService
        )
        await controller.delete(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            "message" : {
                "non_field_error": [
                    "ID do pedido é requerido."
                ]
            }
        });
    });

    test("Deletar pedido 3326291.",  async  () => { 
        let idPedido = "3326291";
        const req = mockRequest({ params: { idPedido: idPedido } });
        const res = mockResponse();  
        mockDataBase.find = jest.fn().mockReturnValue([
            {
                "id" : 1,
                "idPedido": idPedido,
                "entradaCozinha": format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                "saidaCozinha": null,
            }
        ]);
        const controller = new ProducaoController(
            new ProducaoRepository(mockDataBase),
            mockPedidoService
        )
        await controller.delete(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({});
    });


    test("Retorno com erro 500.",  async  () => { 
        let idPedido = "3326291";
        const req = mockRequest({ params: { idPedido: idPedido } });
        const res = mockResponse();  
        mockDataBase.delete = jest.fn<() => Promise<never>>().mockRejectedValue(new Error("Erro interno no servidor."));
        const controller = new ProducaoController(
            new ProducaoRepository(mockDataBase),
            mockPedidoService
        )
        await controller.delete(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            "message" : {
                "non_field_error": [
                    "Error: Erro interno no servidor."
                ]
            }
        });
    });

});