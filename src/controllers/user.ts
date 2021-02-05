import { Request, Response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserService } from 'src/services/user';
import { UserRepository } from 'src/repositories/user';
import { logger } from '../util/logger';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface IUserService {
//     getAll: (limit: number, offset: number) => {}
// }

export class UsersController {
    // private readonly userService: IUserService;

    private router: Router;

    public constructor() {
        this.router = Router();
        this.router.get('/', UsersController.getUsers);
        this.router.post('/', UsersController.createUser);
        this.router.get('/:id', UsersController.getUser);
        this.router.put('/:id', UsersController.updateUser);
        this.router.delete('/:id', UsersController.deleteUser);
        // this.userService = userService;
        // this.userRepository = userRepository;
    }

    getRouter() {
        return this.router;
    }

    /**
     * GET /
     * all users with limit
     */
    static async getUsers(req: Request, res: Response) {
        try {
            const limit: string = req.query.limit.toString();
            const offset: string = req.query.offset.toString();
            const userRepo = getCustomRepository(UserRepository);

            // services
            const users = await new UserService(userRepo).getAll(limit, offset);
            logger.info('Getting users');
            return res.json(users);
        } catch (e) {
            logger.info('Error while Getting users');
            return res.json({
                message: e.message,
                errors: e.errors
            });
        }
    }

    /**
     * POST /
     * create new user
     */
    static async createUser(req: Request, res: Response) {
        try {
            const { firstName, lastName, address, isActive } = req.body;
            const userRepo = getCustomRepository(UserRepository);
            let id;
            // services
            const createUserData = {
                id,
                firstName,
                lastName,
                address,
                isActive
            };
            const user = await new UserService(userRepo).createUser(createUserData);
            logger.info('Creating new user');
            return res.json(user);
        } catch (e) {
            logger.info('Error while creating new user');
            return res.json({
                message: e.message,
                errors: e.errors
            });
        }
    }

    /**
     * GET /:id
     * user by id
     */
    static async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userRepo = getCustomRepository(UserRepository);

            // services
            const user = await new UserService(userRepo).getById(id);
            if (user) {
                logger.info('Getting user by ID');
                return res.status(200).json(user);
            }
            return res.status(404).json({
                error_code: 404,
                message: 'User not found!'
            });
        } catch (e) {
            logger.info('Error while Getting user by ID');
            return res.json({
                message: e.message,
                errors: e.errors
            });
        }
    }

    /**
     * PUT /
     * update user by id
     */
    static async updateUser(req: Request, res: Response) {
        try {
            const { firstName, lastName, address, isActive } = req.body;
            const { id } = req.params;

            const userRepo = getCustomRepository(UserRepository);
            // services
            const updateUserData = {
                id: parseInt(id, 10),
                firstName,
                lastName,
                address,
                isActive
            };
            const user = await new UserService(userRepo).updateUser(id, updateUserData);
            if (user) {
                logger.info('Updating user');
                return res.json(user);
            }
            return res.status(404).json({
                error_code: 404,
                message: 'User not found!'
            });
        } catch (e) {
            logger.info('Error while Updating user');
            return res.json({
                message: e.message,
                errors: e.errors
            });
        }
    }

    /**
     * Delete /:id
     * delete user by id
     */
    static async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userRepo = getCustomRepository(UserRepository);

            // services
            if (await new UserService(userRepo).deleteById(id)) {
                logger.info('Deleting user by ID');
                return res.json({
                    status: 200,
                    message: 'User deleted!'
                });
            }
            return res.status(404).json({
                error_code: 404,
                message: 'User not found!'
            });
        } catch (e) {
            logger.info('Error while Deleting user by ID');
            return res.json({
                message: e.message,
                errors: e.errors
            });
        }
    }
}
