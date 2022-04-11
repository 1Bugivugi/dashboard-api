import { ConfigServiceInterface } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { LoggerInterface } from '../logger/logger.interface';

@injectable()
export class ConfigService implements ConfigServiceInterface {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.LoggerInterface) private loggerService: LoggerInterface) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.loggerService.error('Не удалось прочитать файл .env или он отсутствует');
		} else {
			this.loggerService.log('[ConfigService] Конфигурация .env загружена');
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
