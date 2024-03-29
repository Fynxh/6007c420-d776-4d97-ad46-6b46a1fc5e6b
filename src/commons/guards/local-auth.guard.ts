import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LOCAL_STRATEGY } from '../constants/strategy.constant';

@Injectable()
export class LocalAuthGuard extends AuthGuard(LOCAL_STRATEGY) {}
