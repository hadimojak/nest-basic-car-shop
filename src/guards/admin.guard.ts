import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    console.log(req.session)
    if (!req.currentUser) {
      return false;
    }

    return req.currentUser.admin;
  }
}
