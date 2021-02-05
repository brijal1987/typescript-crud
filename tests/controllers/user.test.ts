import 'reflect-metadata';
import { User } from 'src/entities/user';
import { UserRepository } from 'src/repositories/user';
import { UserService } from 'src/services/user';
import { UsersController } from 'src/controllers/user';

describe('UsersController', () => {
    describe('getUsers', () => {
        let req: any;
        let res: any;
        let user: User[];
        let userRepo;
        let userService: UserService;
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
            user = [
                {
                    id: 1,
                    firstName: 'test',
                    lastName: 'test',
                    address: 'test',
                    isActive: true
                }
            ];
            userRepo = new UserRepository();
            userService = new UserService(userRepo);
        });
        test('success 200', async () => {
            jest.spyOn(userService, 'getAll').mockReturnValue(Promise.resolve(user));
            await UsersController.getUsers(req, res);
            expect(res.status).toBe(200);
        });
        test('throw expection', async () => {
            jest.spyOn(userService, 'getAll').mockImplementation(() => {
                throw new Error();
            });
            await UsersController.getUsers(req, res);
            expect(await UsersController.getUsers(req, res)).toEqual(undefined);
        });
    });
    describe('getUser', () => {
        let req: any;
        let res: any;
        let user: User;
        let userRepo;
        let userService: UserService;
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
            user = {
                id: 1,
                firstName: 'test',
                lastName: 'test',
                address: 'test',
                isActive: true
            };
            userRepo = new UserRepository();
            userService = new UserService(userRepo);
        });
        test('success 200', async () => {
            jest.spyOn(userService, 'getById').mockReturnValue(Promise.resolve(user));
            userService.getById(user.id.toString());
            expect(userService.getById).toHaveBeenCalledWith(user.id.toString());
            await UsersController.getUser(req, res);
            expect(res.status).toBe(200);
        });
        test('throw expection', async () => {
            jest.spyOn(userService, 'getById').mockImplementation(() => {
                throw new Error();
            });
            await UsersController.getUser(req, res);
            expect(await UsersController.getUser(req, res)).toEqual(undefined);
        });
    });
    describe('createUser', () => {
        let req: any;
        let res: any;
        let user: User;
        let userRepo;
        let userService: UserService;
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
            user = {
                id: 1,
                firstName: 'test',
                lastName: 'test',
                address: 'test',
                isActive: true
            };
            userRepo = new UserRepository();
            userService = new UserService(userRepo);
        });
        test('success 200', async () => {
            jest.spyOn(userService, 'createUser').mockReturnValue(Promise.resolve(user));
            userService.createUser(user);
            expect(userService.createUser).toHaveBeenCalledWith(user);
            await UsersController.createUser(req, res);
            expect(res.status).toBe(200);
        });
        test('throw expection', async () => {
            jest.spyOn(userService, 'createUser').mockImplementation(() => {
                throw new Error();
            });
            await UsersController.createUser(req, res);
            expect(await UsersController.createUser(req, res)).toEqual(undefined);
        });
    });
    describe('updateUser', () => {
        let req: any;
        let res: any;
        let user: User;
        let userRepo;
        let userService: UserService;
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
            user = {
                id: 1,
                firstName: 'test',
                lastName: 'test',
                address: 'test',
                isActive: true
            };
            userRepo = new UserRepository();
            userService = new UserService(userRepo);
        });
        test('success 200', async () => {
            jest.spyOn(userService, 'updateUser').mockReturnValue(Promise.resolve(user));
            userService.updateUser(user.id.toString(), user);
            expect(userService.updateUser).toHaveBeenCalledWith(user.id.toString(), user);

            await UsersController.updateUser(req, res);
            expect(res.status).toBe(200);
        });
        test('throw expection', async () => {
            jest.spyOn(userService, 'updateUser').mockImplementation(() => {
                throw new Error();
            });
            await UsersController.updateUser(req, res);
            expect(await UsersController.updateUser(req, res)).toEqual(undefined);
        });
    });
    describe('deleteUser', () => {
        let req: any;
        let res: any;
        let user: User;
        let userRepo;
        let userService: UserService;
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
            user = {
                id: 1,
                firstName: 'test',
                lastName: 'test',
                address: 'test',
                isActive: true
            };
            userRepo = new UserRepository();
            userService = new UserService(userRepo);
        });
        test('success 200', async () => {
            jest.spyOn(userService, 'deleteById').mockReturnValue(Promise.resolve(user));
            userService.deleteById(user.id.toString());
            expect(userService.deleteById).toHaveBeenCalledWith(user.id.toString());
            await UsersController.deleteUser(req, res);
            expect(res.status).toBe(200);
        });
        test('throw expection', async () => {
            jest.spyOn(userService, 'deleteById').mockImplementation(() => {
                throw new Error();
            });
            await UsersController.deleteUser(req, res);
            expect(await UsersController.deleteUser(req, res)).toEqual(undefined);
        });
    });
});
