import { Module } from '@nestjs/common';
import { UserModule } from 'srcs/user/user.module';

@Module({
  imports: [UserModule],
})
export class EventsModule {}
