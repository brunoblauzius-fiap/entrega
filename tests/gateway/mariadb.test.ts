import { describe } from 'node:test';
import { expect, test, it, jest } from '@jest/globals';
import ProducaoRepository from '../../gateways/ProducaoRepository';
import Producao from '../../entity/producao';
import MockDataBase from '../mockDatabase/MockDataBase';
import mockDataBaseNullValue from '../mockDatabase/MockDataBaseNull';


jest.mock('../../interfaces/IDataBase');

describe("Produção Repositório", () => {
    
    test("Recuperando todas os registros",  async  () => {        
        const repository = new ProducaoRepository(MockDataBase);
        
        let producoes = await repository.getAll({});
        
        expect(producoes).toHaveLength(2);
        expect(producoes[0].idPedido).toEqual(33262665);
        expect(producoes[1].idPedido).toEqual(32226599);
    });

    test("Recuperando registro 33262665",  async  () => {        
        const repository = new ProducaoRepository(MockDataBase);
        MockDataBase.find = jest.fn().mockReturnValue([
            {
                "id": 1,
                "idPedido": 33262665,
            },
            {
                "id": 2,
                "idPedido": 32226599,
            },
        ]);
        let producoes = await repository.getAll({idPedido: 33262665});
        
        expect(producoes).toHaveLength(2);
        expect(producoes[0].idPedido).toEqual(33262665);
    });

    test("Criando novo registro",  async  () => {        
        const repository = new ProducaoRepository(MockDataBase);
        
        let producao = await repository.store(new Producao(
            33262665
        ));

        expect(producao).toBeInstanceOf(Producao);
        expect(producao.idPedido).toEqual(33262665);
        expect(producao.id).toEqual(1);
    });

    test("Atualizado registro 33262665",  async  () => {        
        const repository = new ProducaoRepository(MockDataBase);
        
        let producao = await repository.update(new Producao(
            33262665
        ), 1);

        expect(producao).toEqual("Pedido alterado para pronto.");
    });

    test("Excluir registro 33262665",  async  () => {        
        const repository = new ProducaoRepository(MockDataBase);
        let producao = await repository.delete(1);
        expect(producao).toEqual("Pedido excluído com sucesso.");
    });

    test("Recuperar registro inexistente",  async  () => { 
        mockDataBaseNullValue.find = jest.fn().mockReturnValue([]);
        const repository = new ProducaoRepository(mockDataBaseNullValue);
        let producao = await repository.findById(33);
        expect(producao).toEqual(null);
    });


    test("Recuperar registro 33262665",  async  () => {  
        const repository = new ProducaoRepository(MockDataBase);
        MockDataBase.find = jest.fn().mockReturnValue([
            {
                "id": 1,
                "idPedido": 33262665,
            },
        ]);
        let producao = await repository.findById(1);
        expect(producao.idPedido).toEqual(33262665);
    });

});