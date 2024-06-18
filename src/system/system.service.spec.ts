import { Test, TestingModule } from '@nestjs/testing';
import { SystemService } from './system.service';
import { SystemSettingsModel } from './system-settings.model';
import { getModelToken } from '@nestjs/sequelize';

describe('SystemService', () => {
  let service: SystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SystemService,
        { provide: getModelToken(SystemSettingsModel), useValue: {} },
      ],
    }).compile();

    service = module.get<SystemService>(SystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
