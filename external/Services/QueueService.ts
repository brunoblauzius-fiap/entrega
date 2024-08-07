import httpStatus = require('http-status');
import AWSSQS from '../aws_sqs';
const axios = require('axios');

class QueueService {

    // // Função para fazer a consulta do token
    // async  getToken() {
    //     try {
    //         const response = await axios.post('http://192.168.15.63:3007/user/auth');
    //         console.log(response.data.access_token);
    //         return response.data.access_token;
    //     } catch (error) {
    //         console.error('Erro ao obter o token:', error);
    //         throw error;
    //     }
//}

    // // Endpoint para obter o perfil do usuário
    // async setStatusPedido(idPedido: any) {
    //     try {
    //         const pedidoServiceUrl = `http://192.168.15.63:3007/pedidos/update/${idPedido}`;
    //         const token =await this.getToken();
    //         const json={
    //             "status": 2 //pagamento recebido
    //         }

    //         // Faz uma chamada HTTP para o serviço de perfil do usuário
    //         const response = await axios.put(pedidoServiceUrl,json, {
    //                 headers: {
    //                 Authorization: `Bearer ${token}` // Adiciona o token no header
    //             }
    //         });
    //         if (response.status == httpStatus.OK){
    //             return true;
    //         } else {
    //             return false
    //         }
    //     } catch (error) {
    //         console.error('Erro ao fazer solicitação POST:', error);
    //         // Trate o erro aqui de acordo com suas necessidades
    //     }
    // }
    async confirmaEntrega (idPedido: any)    
    {
        const awsSQS = new AWSSQS();
        await awsSQS.send(JSON.stringify({"idPedido" : idPedido}), process.env.AWS_SQS_PEDIDO_FINALIZADO);
        return true;
    }
}

export default QueueService;

