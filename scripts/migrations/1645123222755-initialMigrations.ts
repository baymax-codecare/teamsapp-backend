import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigrations1645123222755 implements MigrationInterface {
  name = 'initialMigrations1645123222755';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "preferred_username" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying(50), "case_of_using" character varying(50), "status" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_d2b2b3d1420188ee0fb6eadd52" ON "users" ("preferred_username") `,
    );
    await queryRunner.query(
      `CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying, "phone_number" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "messages " ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sms" character varying(255) NOT NULL, "is_read" boolean NOT NULL DEFAULT false, "is_sent" boolean NOT NULL DEFAULT false, "is_sender_deleted" boolean NOT NULL DEFAULT false, "is_receiver_deleted" boolean NOT NULL DEFAULT false, "sender_id" uuid, "receiver_id" uuid, CONSTRAINT "PK_8ae4a840c90d08677a68bf7a1bb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "phone_numbers" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone_number" character varying(50) NOT NULL, CONSTRAINT "PK_a72cf9a1834a1417e195fdd2c02" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "phone_numbers_users_users" ("phoneNumbersId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_d565b54e8ab570a807194aa5ff0" PRIMARY KEY ("phoneNumbersId", "usersId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_08295e8cc6d8dea5eac735709f" ON "phone_numbers_users_users" ("phoneNumbersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b849192f49ca66ccb4f0ac3e3a" ON "phone_numbers_users_users" ("usersId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_af0a71ac1879b584f255c49c99a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages " ADD CONSTRAINT "FK_2f286ee8b4c8c7efe09779e63a7" FOREIGN KEY ("sender_id") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages " ADD CONSTRAINT "FK_b90ca496fad420e1bf7cbbc1f50" FOREIGN KEY ("receiver_id") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "phone_numbers_users_users" ADD CONSTRAINT "FK_08295e8cc6d8dea5eac735709f9" FOREIGN KEY ("phoneNumbersId") REFERENCES "phone_numbers"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "phone_numbers_users_users" ADD CONSTRAINT "FK_b849192f49ca66ccb4f0ac3e3a7" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "phone_numbers_users_users" DROP CONSTRAINT "FK_b849192f49ca66ccb4f0ac3e3a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "phone_numbers_users_users" DROP CONSTRAINT "FK_08295e8cc6d8dea5eac735709f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages " DROP CONSTRAINT "FK_b90ca496fad420e1bf7cbbc1f50"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages " DROP CONSTRAINT "FK_2f286ee8b4c8c7efe09779e63a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_af0a71ac1879b584f255c49c99a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b849192f49ca66ccb4f0ac3e3a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_08295e8cc6d8dea5eac735709f"`,
    );
    await queryRunner.query(`DROP TABLE "phone_numbers_users_users"`);
    await queryRunner.query(`DROP TABLE "phone_numbers"`);
    await queryRunner.query(`DROP TABLE "messages "`);
    await queryRunner.query(`DROP TABLE "contacts"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d2b2b3d1420188ee0fb6eadd52"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
