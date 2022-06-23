import { Company } from './../../company/entities/company.entity';
import { BaseEntity } from './../../persistence/base.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  hashedRefreshToken: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Company, (Company) => Company.manager)
  companies: Company[];

  @Column({ default: true })
  isActive: boolean;
}
