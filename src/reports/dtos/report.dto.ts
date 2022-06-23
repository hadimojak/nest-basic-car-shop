import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  year: number;
  @Expose()
  lng: number;
  lat: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  mileage: number;
  @Transform(({ obj }) => {
    return obj.user.id;
  })
  @Expose()
  userId: number;
  @Expose()
  approved: boolean;
}
