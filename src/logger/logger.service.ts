import { Logger } from 'tslog';
import { LoggerInterface } from './logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

// По сути абстракция над Logger
@injectable()
export class LoggerService implements LoggerInterface {
	// Можно сделать private => инстанс нельзя получить извне
	public logger: Logger;

	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
			displayFunctionName: false,
		});
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
