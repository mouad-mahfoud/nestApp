import { Column, Entity } from 'typeorm';

@Entity('cities', { schema: 'my_app_db' })
export class City {
  @Column('bigint', { primary: true, name: 'id' })
  id: string;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;
}
