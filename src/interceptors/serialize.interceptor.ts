// prettier-ignore
import { UseInterceptors,NestInterceptor,ExecutionContext,CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface classConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: classConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // tun somthing before the request is handled byt requset handler

    return next.handle().pipe(
      map((data: any) => {
        //run somthing before the response is sent out
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
