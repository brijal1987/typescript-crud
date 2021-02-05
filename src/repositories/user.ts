import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entities/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    getAll(limit: number, offset: number): Promise<User[]> {
        return this.find({
            order: {
                id: 'DESC'
            },
            skip: offset,
            take: limit,
            cache: true
        });
    }

    createUser(user: User): Promise<User> {
        return this.save(user);
    }

    getById(id: number): Promise<User> {
        return this.findOne(id);
    }

    updateUser(user: User): Promise<User> {
        return this.save(user);
    }

    deleteById(user: User): Promise<User> {
        return this.save(user);
    }
}
