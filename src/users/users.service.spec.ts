import 'reflect-metadata';
import { Container } from 'inversify';
import { ConfigServiceInterface } from '../config/config.service.interface';
import { UsersRepositoryInterface } from './users.repository.interface';
import { UsersServiceInterface } from './users.service.interface';
import { UsersService } from './users.service';
import { TYPES } from '../types';
import { UserEntity } from './user.entity';
import { UserModel } from '@prisma/client';

const ConfigServiceMock: ConfigServiceInterface = {
	get: jest.fn(),
};

const UserRepositoryMock: UsersRepositoryInterface = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: ConfigServiceInterface;
let usersRepository: UsersRepositoryInterface;
let usersService: UsersServiceInterface;

beforeAll(() => {
	container.bind<UsersServiceInterface>(TYPES.UsersService).to(UsersService);
	container.bind<ConfigServiceInterface>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container
		.bind<UsersRepositoryInterface>(TYPES.UsersRepository)
		.toConstantValue(UserRepositoryMock);

	usersService = container.get<UsersServiceInterface>(TYPES.UsersService);
	configService = container.get<ConfigServiceInterface>(TYPES.ConfigService);
	usersRepository = container.get<UsersRepositoryInterface>(TYPES.UsersRepository);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: UserEntity): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		createdUser = await usersService.createUser({
			email: 'a@a.ru',
			name: 'John',
			password: '123',
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('123');
	});

	it('validateUser - success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const result = await usersService.validateUser({
			email: 'a@a.ru',
			password: '1',
		});
		expect(result).toBeTruthy();
	});

	it('validateUser - wrong password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const result = await usersService.validateUser({
			email: 'a@a.ru',
			password: '2',
		});
		expect(result).toBeFalsy();
	});

	it('validateUser - wrong user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const result = await usersService.validateUser({
			email: 'a2@a.ru',
			password: '2',
		});
		expect(result).toBeFalsy();
	});
});
