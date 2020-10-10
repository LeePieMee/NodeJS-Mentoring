import request from 'supertest';
import express from 'express';
import {userController, UserController} from './userController';

const app = express();

app.use(express.json());
app.use('/', userController.router);

describe('should test user controller', () => {
    describe('get method of user controller', () => {
        it('returns response status 200 when record exist in db', async () => {
            const res = await request(app).get(`${UserController.baseUrl}/2`);
            expect(res.status).toEqual(200);
        });
        it('returns response status 500 when record doesn`t exist in db', async () => {
            const res = await request(app).get(`${UserController.baseUrl}/null`);
            expect(res.status).toEqual(500);
        });
        it('has record id equal id in query string', async () => {
            const res = await request(app).get(`${UserController.baseUrl}/2`);
            expect(res.body.id).toEqual('2');
        });
    });
    describe('create method of user controller', () => {
        it('should create new record in db', async () => {
            const mockUser = {
                login: 'test',
                password: '123',
                age: '56',
                isDeleted: false,
            };

            const res = await request(app).post(`${UserController.baseUrl}`).send(mockUser);

            const user = res.body;

            expect(res.status).toEqual(200);
            expect(user).toHaveProperty('id');
        });
    });
    describe('update method of user controller', () => {
        it('should update record in db', async () => {
            const mockUser = {
                login: 'test',
                password: 'test',
                age: '19',
                isDeleted: false,
            };
            const res = await request(app).post(`${UserController.baseUrl}/2`).send(mockUser);

            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual(`User was changed`);
        });
    });
});
