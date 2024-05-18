import { describe } from 'node:test';
import { expect, test } from '@jest/globals';
import Producao from '../../entity/producao';

describe("Entidade Produção", () => {
    test("Cria objeto Produção", () => {
      let instance = new Producao(
            12123,
            "2024-04-04 12:00:00",
            "2024-04-04 12:30:00",
            12

      );
      expect(instance).toBeInstanceOf(Producao);
    });

    test("Valida dados Produção", () => {
        let dataEntrada = "2024-04-04 12:00:00";
        let dataSaida = "2024-04-04 12:30:00";
        let idPedido = 12123;
        let instance = new Producao(
              idPedido,
              dataEntrada,
              dataSaida,
              1
  
        );
        expect(instance.entradaCozinha).toEqual(dataEntrada);
        expect(instance.saidaCozinha).toEqual(dataSaida);
        expect(instance.idPedido).toEqual(idPedido);
        expect(instance.id).toEqual(1);
      });


    test("Valida id do peido", () => {
        expect(() => {
            let dataEntrada = "2024-04-04 12:00:00";
            let dataSaida = "2024-04-04 12:30:00";
            let idPedido = null;
            new Producao(
                idPedido,
                dataEntrada,
                dataSaida,
                1
            );
        }).toThrow("O idPedido é requerido.");
      });
});