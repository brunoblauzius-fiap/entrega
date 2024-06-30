import Server  from "./server";
import {MysqlDataBase} from "./external/MysqlDataBase";
import AWSSQS from "./external/aws_sqs";
import QueueSubscribeRepository from "./gateways/QueueSubscribeRepository";

let  port = process.env.PORT || 3000;
const _db = new MysqlDataBase();
const _server = new Server(_db);


const queueRepository = new QueueSubscribeRepository(
    new AWSSQS(),
    _db
);

function startReceivingMessages() {
    setInterval(async () => {
        await queueRepository.entregaConfirmar();
    }, 1000);
}

_server.app.listen(port, () => {
    console.log('Server exec: PORTA -> ' + port);
    startReceivingMessages();
});
