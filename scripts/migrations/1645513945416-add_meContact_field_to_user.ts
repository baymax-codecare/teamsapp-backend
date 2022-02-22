import {MigrationInterface, QueryRunner} from "typeorm";

export class addMeContactFieldToUser1645513945416 implements MigrationInterface {
    name = 'addMeContactFieldToUser1645513945416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "meContactId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_1ee29bdeeeb7610a4f9dc7d21ad" UNIQUE ("meContactId")`);
        await queryRunner.query(`ALTER TABLE "contacts" ALTER COLUMN "isHidden" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_1ee29bdeeeb7610a4f9dc7d21ad" FOREIGN KEY ("meContactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1ee29bdeeeb7610a4f9dc7d21ad"`);
        await queryRunner.query(`ALTER TABLE "contacts" ALTER COLUMN "isHidden" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_1ee29bdeeeb7610a4f9dc7d21ad"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "meContactId"`);
    }

}
