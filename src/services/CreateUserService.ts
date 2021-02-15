import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Users from '../models/Users';

interface Request {
  name: string;
  email: string;
  password: string;
  cpf: number;
  deliveryman: boolean;
}

export default class CreateUserService {
  public async execute({ name, email, password, cpf, deliveryman}: Request): Promise<Users> {
    const usersRepository = getRepository(Users);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('E-mail address already used!')
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      cpf,
      deliveryman
    });

    await usersRepository.save(user);

    return user;
  }
}