import { jest } from '@jest/globals';
import { IDataBase } from '../../interfaces/IDataBase';

const mockDataBaseNullValue: jest.Mocked<IDataBase> = {
    store: jest.fn().mockReset().mockReturnValue({}) ,
    update: jest.fn().mockReturnValue(undefined),
    delete: jest.fn().mockReturnValue(undefined),
    find: jest.fn().mockReset().mockReturnValue([]),
    query : jest.fn().mockReturnValue(undefined)
};

export default mockDataBaseNullValue;