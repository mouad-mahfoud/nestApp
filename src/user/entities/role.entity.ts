import { Column, Entity, Index } from "typeorm";

@Index("UK_ofx66keruapi6vyqpv6f2or37", ["name"], { unique: true })
@Entity("roles", { schema: "my_app_db" })
export class Roles {
  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("varchar", { name: "name", unique: true, length: 50 })
  name: string;
}
