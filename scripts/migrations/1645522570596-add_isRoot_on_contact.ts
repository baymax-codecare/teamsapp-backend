import {MigrationInterface, QueryRunner} from "typeorm";

export class addIsRootOnContact1645522570596 implements MigrationInterface {
    name = 'addIsRootOnContact1645522570596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" ADD "isRoot" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "contacts" ALTER COLUMN "isHidden" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" ALTER COLUMN "isHidden" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "isRoot"`);
    }

}
