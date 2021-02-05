import { User } from 'src/entities/user';

export interface IUserRepo {
    getAll: (limit: number, offset: number) => {};
    createUser: (user: User) => Promise<User>;
    getById: (id: number) => Promise<User>;
    updateUser: (user: User) => Promise<User>;
    deleteById: (user: User) => Promise<User>;
}

export class UserService {
    private readonly userRepository: IUserRepo;

    public constructor(userRepository: IUserRepo) {
        this.userRepository = userRepository;
    }

    getAll(limit: string, offset: string) {
        return this.userRepository.getAll(parseInt(limit, 10), parseInt(offset, 0));
    }

    createUser(user: User) {
        return this.userRepository.createUser(user);
    }

    getById(id: string) {
        return this.userRepository.getById(parseInt(id, 0));
    }

    async updateUser(id: string, user: User) {
        const userData = await this.userRepository.getById(parseInt(id, 0));
        if (userData) {
            userData.firstName = user.firstName;
            userData.lastName = user.lastName;
            userData.address = user.address;
            return this.userRepository.updateUser(userData);
        }
        return false;
    }

    async deleteById(id: string) {
        const userData = await this.userRepository.getById(parseInt(id, 0));
        if (userData) {
            userData.isActive = false;
            return this.userRepository.deleteById(userData);
        }
        return false;
    }
}
