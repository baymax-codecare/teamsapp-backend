import {MigrationInterface, QueryRunner} from "typeorm";

export class addPhoneNumbersTable1643856698959 implements MigrationInterface {
    name = 'addPhoneNumbersTable1643856698959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "phone_numbers" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone_number" character varying(50) NOT NULL, "userId" uuid, CONSTRAINT "PK_a72cf9a1834a1417e195fdd2c02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "phone_numbers" ADD CONSTRAINT "FK_61f0aacd415edcd3268eab0a4b4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phone_numbers" DROP CONSTRAINT "FK_61f0aacd415edcd3268eab0a4b4"`);
        await queryRunner.query(`DROP TABLE "phone_numbers"`);
    }

}
