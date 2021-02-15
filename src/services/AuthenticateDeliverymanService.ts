import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import Users from '../models/Users';

interface Request {
  cpf: number;
  password: string;
}

interface Response {
  user: Users;
  token: string;
}

export default class AuthenticateDeliverymanService {
   public async execute({ cpf, password }: Request): Promise<Response> {
    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne({ where: { cpf } });

    if(!user) {
      throw new Error('Incorrect cpf/password combination!');
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new Error('Incorrect cpf/password combination!');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.name,
      expiresIn,
    })
   
    return {
      user,
      token
    }
  }
}