import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { IResponnse } from '../interfaces/response.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IResponnse> {
    return next.handle().pipe(
      map((data) => {
        return {
          status: true,
          message: 'success',
          data,
        };
      }),
    );
  }
}
