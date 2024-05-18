import { describe } from 'node:test';
import { expect, test } from '@jest/globals';
import Producao from '../../entity/producao';
import ResponseAPI from '../../adapters/ResponseAPI';

describe("Entidade ResponseAPI", () => {
    test("Saida de lista", () => {
      let response = ResponseAPI.list([{
            id : 1,
            idPedido : 33356989
      }]);
      expect(response).toEqual({
            'totals' : 1,
            'results' : [
                {
                        id : 1,
                        idPedido : 33356989
                }
            ]
      });
    });

    test("Saida de success", () => {
        let response = ResponseAPI.success("SUCESSO");
        expect(response).toEqual({'message' : ["SUCESSO"]});
    });


    test("Saida de error", () => {
        let response = ResponseAPI.inputError("id", "ERRO");
        expect(response).toEqual({'message' : {"input" : ["ERRO"]}});
    });
});