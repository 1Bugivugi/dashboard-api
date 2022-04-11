import { Request, Response, NextFunction } from 'express';

export class ExceptionFilterInterface {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
