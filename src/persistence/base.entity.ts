import { BeforeInsert, Column } from 'typeorm';

export class BaseEntity {
  @Column('bigint', { primary: true, name: 'id' })
  id: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('varchar', { name: 'public_id', length: 64, unique: true })
  publicId: string;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @BeforeInsert()
  generatePublicId() {
    let randomString = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 16; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    this.publicId = randomString;
  }
}
