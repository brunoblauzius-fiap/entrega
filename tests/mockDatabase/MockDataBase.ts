import { jest } from '@jest/globals';
import { IDataBase } from '../../interfaces/IDataBase';

// Defina um objeto com métodos mockados para a interface IDataBase
const mockDataBase: jest.Mocked<IDataBase> = {
    store: jest.fn().mockReturnValue({ insertId: 1 }) ,
    update: jest.fn().mockReturnValue(undefined),
    delete: jest.fn().mockReturnValue(undefined),
    find: jest.fn().mockReturnValue([
        { id: 1, idPedido: 33262665 },
        { id: 2, idPedido: 32226599 }
    ]),
    query : jest.fn().mockReturnValue(undefined)
};

export default mockDataBase;