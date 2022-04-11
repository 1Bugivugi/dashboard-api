import { LoggerService } from '../logger/logger.service';
import { Response, Router } from 'express';
import { ExpressReturnType, RouteInterface } from './route.interface';
import { LoggerInterface } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

/**
 * Abstract BaseController class
 */
@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	/**
	 * Constructor
	 *
	 * @param logger
	 */
	constructor(private logger: LoggerInterface) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	/**
	 * Send method
	 *
	 * @param res
	 * @param code
	 * @param message
	 */
	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	/**
	 * Ok method that sends passed msg
	 *
	 * @param res
	 * @param message
	 */
	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	/**
	 * Sends 201 status on create
	 *
	 * @param res
	 */
	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	/**
	 * Bind routes method
	 *
	 * @param routes
	 * @protected
	 */
	protected bindRoutes(routes: RouteInterface[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			// Сохранение контекста
			const handler = route.func.bind(this);
			const pipeline = middleware ? [...middleware, handler] : handler;
			// => this.router.get()
			// => this.router.post() и т.д
			this.router[route.method](route.path, pipeline);
		}
	}
}
