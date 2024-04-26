import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class PostInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const request = context.switchToHttp().getRequest();
        if (request.method === 'POST') {
          // Nếu là phương thức POST và status code là 201, thì thay đổi thành 200
          const response = context.switchToHttp().getResponse();
          if (response.statusCode === HttpStatus.CREATED) {
            response.status(HttpStatus.OK);
          }
        }
        console.log('End Interceptor...');
        return data;
      }),
    );
  }
}
