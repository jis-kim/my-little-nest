import { Module } from '@nestjs/common';
import { UserModule } from 'srcs/user/user.module';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  providers: [AuthService],
})
export class AuthModule {}
