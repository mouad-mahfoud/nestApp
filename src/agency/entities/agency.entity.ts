import { City } from './../../city/entities/city.entity';
import { BaseEntity } from './../../persistence/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Index('UK_508sdjiaidsenrgq0secbysus', ['name'], { unique: true })
@Entity('agencies', { schema: 'my_app_db' })
export class Agency extends BaseEntity {
  @Column('varchar', {
    name: 'name',
    nullable: true,
    unique: true,
    length: 255,
  })
  name: string | null;

  @ManyToOne(() => City)
  city: City;
}
