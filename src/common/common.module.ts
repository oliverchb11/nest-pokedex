import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adepters/axios.adapter';

@Module({
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class CommonModule {}
