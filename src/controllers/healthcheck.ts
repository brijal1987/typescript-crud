import { Request, Response, Router } from 'express';

export class HealthcheckController {
    private router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/liveness', HealthcheckController.liveness);
        this.router.get('/readiness', HealthcheckController.readiness);
    }

    getRouter() {
        return this.router;
    }

    /**
     * GET /
     * liveness
     */
    static liveness(_: Request, res: Response) {
        try {
            res.json({
                message: 'Liveness!',
                status: 200
            });
        } catch (e) {
            res.json({
                message: e.message,
                errors: e.errors
            });
        }
    }

    /**
     * GET /
     * readiness
     */
    static readiness(_: Request, res: Response) {
        try {
            res.json({
                uptime: process.uptime(),
                message: 'Readiness!',
                timestamp: Date.now(),
                status: 200
            });
        } catch (e) {
            res.json({
                message: e.message,
                errors: e.errors
            });
        }
    }
}
