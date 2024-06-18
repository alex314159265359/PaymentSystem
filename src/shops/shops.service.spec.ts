import { Test, TestingModule } from '@nestjs/testing';
import { ShopsService } from './shops.service';
import { ShopsModel } from './shops.model';
import { PaymentsModel } from '../payments/payments.model';
import { SystemSettingsModel } from '../system/system-settings.model';
import { getConnectionToken, getModelToken } from '@nestjs/sequelize';

describe('ShopsService', () => {
  let service: ShopsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopsService,
        { provide: getConnectionToken(), useValue: {} },
        { provide: getModelToken(ShopsModel), useValue: {} },
        { provide: getModelToken(PaymentsModel), useValue: {} },
        { provide: getModelToken(SystemSettingsModel), useValue: {} },
      ],
    }).compile();

    service = module.get<ShopsService>(ShopsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
