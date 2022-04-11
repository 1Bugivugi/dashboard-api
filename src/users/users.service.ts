import { UsersServiceInterface } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { inject, injectable } from 'inversify';
import { UserEntity } from './user.entity';
import { TYPES } from '../types';
import { ConfigServiceInterface } from '../config/config.service.interface';
import { UsersRepositoryInterface } from './users.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UsersService implements UsersServiceInterface {
	constructor(
		@inject(TYPES.ConfigService) private configService: ConfigServiceInterface,
		@inject(TYPES.UsersRepository) private usersRepository: UsersRepositoryInterface,
	) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new UserEntity(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const userExists = await this.usersRepository.find(email);
		if (userExists) {
			return null;
		}
		// проверка, что он есть
		// если есть - возвращаем null, нет - создаем
		return this.usersRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const userExists = await this.usersRepository.find(email);
		if (!userExists) {
			return false;
		}
		const newUser = new UserEntity(userExists?.email, userExists?.name, userExists?.password);
		return newUser.comparePassword(password);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.find(email);
	}
}
