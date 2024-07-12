import { Controller, Post, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('create')
  createWallet(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }
}
