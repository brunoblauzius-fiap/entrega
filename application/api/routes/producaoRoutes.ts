import * as express from "express";
import ProducaoController from "../../../controllers/ProducaoController";
import { IDataBase } from "../../../interfaces/IDataBase";
import ProducaoRepository from "../../../gateways/ProducaoRepository";
import PedidoService from "../../../external/Services/PedidoService";


export default function produtoRoutes(dbconnection: IDataBase) {
    let router = express.Router();
    
    const producaoController = new ProducaoController(
        new ProducaoRepository(dbconnection),
        new PedidoService()
    );

    router.get('/producao', producaoController.all);
    router.post('/producao', producaoController.store);
    router.get('/producao/:idPedido', producaoController.show);
    router.put('/producao/:idPedido', producaoController.update);
    router.delete('/producao/:idPedido', producaoController.delete);
    return router;
}

//export default router;