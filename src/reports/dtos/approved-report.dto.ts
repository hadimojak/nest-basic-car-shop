import { Expose, Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class ApprovedReportDto {
  @IsBoolean()
  approved: boolean;
}
