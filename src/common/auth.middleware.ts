import { NextFunction, Request, Response } from 'express';
import { MiddlewareInterface } from './middleware.interface';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements MiddlewareInterface {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					if (payload instanceof Object) {
						req.user = payload.email;
					}
					next();
				}
			});
		} else {
			next();
		}
	}
}
