export interface IRequestUser {
  userId: string;
  email: string;
}

export interface IUserAuthInfoRequest extends Request {
  user: IRequestUser;
}
