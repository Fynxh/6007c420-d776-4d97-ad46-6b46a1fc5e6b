import { Injectable } from '@nestjs/common';
import { ICompare, IHash } from '../interfaces/password.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hash(options: IHash) {
    const { password, saltOrRound } = options;

    const hashedPassword = await bcrypt.hash(password, saltOrRound ?? 10);

    return hashedPassword;
  }

  async compare(options: ICompare) {
    const { hashedPassword, password } = options;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
  }
}
