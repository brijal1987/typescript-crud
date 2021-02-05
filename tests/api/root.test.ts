import supertest from 'supertest';
import { getConnection } from 'typeorm';

import { createApp } from 'src/app';

describe('Root Integration tests', () => {
    let server: Express.Application;

    beforeAll(async () => {
        server = await createApp();
    });

    afterAll(async () => {
        await getConnection().close();
    });

    describe('/', () => {
        it('returns 200', async () => {
            const response = await supertest(server).get('/');
            expect(response.status).toBe(200);
        });
    });
});
