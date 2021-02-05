import 'reflect-metadata';
import { HealthcheckController } from 'src/controllers/healthcheck';

describe('HealthcheckController', () => {
    describe('liveness', () => {
        let req: any;
        let res: any;
        beforeEach(() => {
            req = {
                get: jest.fn((name) => {
                    if (name === 'content-type') return 'text/plain';
                    return 'application/json';
                })
            };
            res = {
                status: 200,
                json: jest.fn()
            };
        });
        test('success 200', () => {
            HealthcheckController.liveness(req, res);
            expect(res.status).toBe(200);
        });
    });
});
