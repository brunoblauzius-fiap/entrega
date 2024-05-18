import { jest } from '@jest/globals';
import PedidoService from '../../external/Services/PedidoService';

const mockPedidoService: jest.Mocked<PedidoService> = {
    getToken : jest.fn(),
    setStatusPedido : jest.fn(),
}

export default mockPedidoService;