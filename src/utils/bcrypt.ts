import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';

export async function encodePassword(password: string): Promise<string> {
  try {
    const genSalt = await bcrypt.genSalt(7);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    return hashedPassword;
  } catch (error) {
    throw new HttpException(error, 500);
  }
}

export async function comparePassword(password, hash) {
  try {
    const isPassword = await bcrypt.compare(password, hash);

    return isPassword;
  } catch (error) {
    throw new HttpException(error, 403);
  }
}
