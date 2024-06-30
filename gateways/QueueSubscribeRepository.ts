import AWSSQS from "../external/aws_sqs";
import { IDataBase } from "../interfaces/IDataBase";
import { IQueue } from "../interfaces/IQueue";
import ProducaoRepository from "./ProducaoRepository";
import { ProducaoCasoDeUso } from "../cases/producaoCasodeUso";
import Producao from "../entity/producao";

class QueueSubscribeRepository implements IQueue {
    
    queue_name : string = process.env.AWS_SQS_PEDIDO_ENTREGA;

    repository : ProducaoRepository;
    pedido : Producao;

    constructor( 
        readonly sqsQueue: AWSSQS, 
        readonly dataBase : IDataBase
    ) {
        this.repository = new ProducaoRepository(dataBase);
    }

    async entregaConfirmar() : Promise<void> {
        /**
         * {idPedido : int}
         */
        const messages = await this.sqsQueue.receive(process.env.AWS_SQS_PEDIDO_ENTREGA);

        if (messages) {
            for (const message of messages) {
                console.log("Messagem recebida entregaConfirmar:" , message.Body ); 
                let idPedido = JSON.parse(message.Body).idPedido; 

                // Excluir a mensagem da fila após o processamento
                //this.pedido = await this.repository.findById(idPedido);
                if (idPedido != null) {
                    ProducaoCasoDeUso.sendProducao(
                        null,
                        this.repository,
                        idPedido
                    );
                    await this.sqsQueue.deleteMessage(message.ReceiptHandle, process.env.AWS_SQS_PEDIDO_ENTREGA);
                } else {
                    console.log(`Pedido com o ID ${idPedido} não exite.`);
                }
            }
        } 
    }
    
}

export default QueueSubscribeRepository;