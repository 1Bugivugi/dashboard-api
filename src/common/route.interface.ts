import { NextFunction, Request, Response, Router } from 'express';
import { MiddlewareInterface } from './middleware.interface';

export interface RouteInterface {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	/**
	 * Pick это утилитарный тип, который берет из нашего Интерфейса значения
	 * и создает новые значения
	 * (в данном случае создали интерфейс из роутера который состоит только из этих переданных вещей)
	 */
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	middlewares?: MiddlewareInterface[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
