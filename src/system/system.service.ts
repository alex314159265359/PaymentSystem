import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SystemSettingsModel } from './system-settings.model';
import { SetCommissionDto } from './dto/set-commission.dto';

@Injectable()
export class SystemService {
  constructor(
    @InjectModel(SystemSettingsModel)
    private systemSettingsModel: typeof SystemSettingsModel,
  ) {}

  async setCommission(commissions: SetCommissionDto) {
    await this.systemSettingsModel.upsert({
      key: 'commissions',
      attrs: commissions,
    });
    return { message: 'Successfully updated.' };
  }
}
