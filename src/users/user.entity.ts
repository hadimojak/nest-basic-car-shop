// prettier-ignore
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert ,AfterUpdate,AfterRemove} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

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
