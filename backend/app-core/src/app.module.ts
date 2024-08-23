import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { WalletModule } from './wallet/wallet.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: parseInt(process.env.RATE_LIMIT_TTL),
      limit: parseInt(process.env.RATE_LIMIT),
    }),
    MongooseModule.forRoot(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    UserModule,
    TransactionModule,
    // WalletModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
