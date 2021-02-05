import { UserRepository } from 'src/repositories/user';

describe('UserRepository', () => {
    it('should getAll', async function () {
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
        const userResopnse = await userRepo.getAll(limit, offset);
        expect(userSpy).toHaveBeenCalled();
        expect(userResopnse.length).toBe(1);
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
        const userResopnse = await userRepo.getById(user.id);
        expect(userSpy).toHaveBeenCalled();
        expect(userResopnse.id).toBe(user.id);
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
        const userResopnse = await userRepo.createUser(user);
        expect(userSpy).toHaveBeenCalled();
        expect(userResopnse).toBe(user);
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
        const userSpy = jest.spyOn(userRepo, 'save').mockReturnValue(Promise.resolve(user));
        const userResopnse = await userRepo.deleteById(user);
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
        const userSpy = jest.spyOn(userRepo, 'save').mockReturnValue(Promise.resolve(user));
        const userResopnse = await userRepo.updateUser(user);
        expect(userSpy).toHaveBeenCalled();
        expect(userResopnse).toBe(user);
    });
});
