import { IJwtPayload } from '../../../commons/interfaces/jwt-payload.interface';

export interface IGenerateToken {
  payload: IJwtPayload;
  secret: string;
  expiresIn: string;
}
