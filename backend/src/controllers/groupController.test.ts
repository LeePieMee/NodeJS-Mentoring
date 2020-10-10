import request from 'supertest';
import express from 'express';
import {groupController, GroupController} from './groupController';

const app = express();

app.use(express.json());
app.use('/', groupController.router);

describe('should test group controller', () => {
    describe('get method of group controller', () => {
        it('returns response status 200 when record exist in db', async () => {
            const res = await request(app).get(`${GroupController.baseUrl}/1`);
            expect(res.status).toEqual(200);
        });
        it('returns response status 500 when record doesn`t exist in db', async () => {
            const res = await request(app).get(`${GroupController.baseUrl}/null`);
            expect(res.status).toEqual(500);
        });
        it('has record id equal id in query string', async () => {
            const res = await request(app).get(`${GroupController.baseUrl}/3`);
            expect(res.body.id).toEqual('3');
        });
    });
    describe('create method of group controller', () => {
        it('should create new record in db', async () => {
            const mockGroup = {name: 'USER', permissions: ['READ', 'UPLOAD_FILES']};

            const res = await request(app).post(`${GroupController.baseUrl}`).send(mockGroup);

            const group = res.body;

            expect(res.status).toEqual(200);
            expect(group).toHaveProperty('id');
        });
    });
    describe('update method of group controller', () => {
        it('should update record in db', async () => {
            const mockGroup = {name: 'SUPER-USER', permissions: ['READ', 'UPLOAD_FILES', 'DELETE']};

            const res = await request(app).post(`${GroupController.baseUrl}/3`).send(mockGroup);

            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual(`Group was changed`);
        });
    });
    // describe('delete method of group controller', () => {
    //     it('should delete record in db', async () => {
    //         const res = await request(app).delete(`${GroupController.baseUrl}/1`);

    //         expect(res.status).toEqual(200);
    //         expect(res.body.message).toEqual(`Group with id 1 was deleted`);
    //     });
    // });
});
