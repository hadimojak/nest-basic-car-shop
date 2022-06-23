import { Report } from 'src/reports/report.entity';
// prettier-ignore
import {Entity,Column,PrimaryGeneratedColumn,AfterInsert,AfterUpdate,AfterRemove,OneToMany,} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: true })
  admin: boolean;

  @Column()
  password: string;

  // prettier-ignore
  @OneToMany(() => {return Report}, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('inserted user id ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('updated user id ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('removed user id ', this.id);
  }
}
