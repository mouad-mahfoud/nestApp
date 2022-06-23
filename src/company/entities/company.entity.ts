import { User } from './../../user/entities/user.entity';

import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './../../persistence/base.entity';

@Index('FK72grr7fyp40ile7imajgdoggj', ['managerId'], {})
@Entity('companies', { schema: 'my_app_db' })
export class Company extends BaseEntity {
  @Column('varchar', { name: 'address', nullable: true, length: 255 })
  address: string | null;

  @Column('varchar', { name: 'logo', nullable: true, length: 255 })
  logo: string | null;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('bigint', { name: 'manager_id', nullable: true })
  managerId: string | null;

  @ManyToOne(() => User, (user) => user.companies, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'manager_id', referencedColumnName: 'id' }])
  manager: User;
}
