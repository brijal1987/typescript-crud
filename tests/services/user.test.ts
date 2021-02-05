import 'reflect-metadata';
import { UserRepository } from 'src/repositories/user';
import { UserService } from 'src/services/user';

describe('UserService', () => {
    it('should getAll', function () {
        const user = [
            {
                id: 1,
                firstName: 'test',
                lastName: 'test',
                address: 'test',
                isActive: true
            }
        ];
        const limit = 2;
        const offset = 0;
        const userRepo = new UserRepository();
        const userSpy = jest.spyOn(userRepo, 'find').mockReturnValue(Promise.resolve(user));
        const userService = new UserService(userRepo);
        userService.getAll(limit.toString(), offset.toString());
        expect(userSpy).toHaveBeenCalled();
    });
    it('should getById', async function () {
        const user = {
            id: 1,
            firstName: 'test',
            lastName: 'test',
            address: 'test',
            isActive: true
        };
        const userRepo = new UserRepository();
        const userSpy = jest.spyOn(userRepo, 'findOne').mockReturnValue(Promise.resolve(user));
        const userService = new UserService(userRepo);
        const userResopnse = await userService.getById(user.id.toString());
        expect(userSpy).toHaveBeenCalled();
        expect(userResopnse.id).toBe(user.id);
    });
    it('should deleteById', async function () {
        const user = {
            id: 1,
            firstName: 'test',
            lastName: 'test',
            address: 'test',
            isActive: true
        };
        const userRepo = new UserRepository();
        jest.spyOn(userRepo, 'findOne').mockReturnValue(Promise.resolve(user));
        const userSpy = jest.spyOn(userRepo, 'save').mockReturnValue(Promise.resolve(user));
        const userService = new UserService(userRepo);
        const userResopnse = await userService.deleteById(user.id.toString());
        expect(userSpy).toHaveBeenCalled();
        expect(userResopnse).toBe(user);
    });
    it('should updateUser', async function () {
        const user = {
            id: 1,
            firstName: 'test',
            lastName: 'test',
            address: 'test',
            isActive: true
        };
        const userRepo = new UserRepository();
        jest.spyOn(userRepo, 'findOne').mockReturnValue(Promise.resolve(user));
        const userSpy = jest.spyOn(userRepo, 'save').mockReturnValue(Promise.resolve(user));
        const userService = new UserService(userRepo);
        const userResopnse = await userService.updateUser(user.id.toString(), user);
        expect(userSpy).toHaveBeenCalled();
        expect(userResopnse).toBe(user);
    });
    it('should createUser', async function () {
        const user = {
            id: 1,
            firstName: 'test',
            lastName: 'test',
            address: 'test',
            isActive: true
        };
        const userRepo = new UserRepository();
        const userSpy = jest.spyOn(userRepo, 'save').mockReturnValue(Promise.resolve(user));
        const userService = new UserService(userRepo);
        const userResopnse = await userService.createUser(user);
        expect(userSpy).toHaveBeenCalled();
        expect(userResopnse.id).toBe(user.id);
    });
});
