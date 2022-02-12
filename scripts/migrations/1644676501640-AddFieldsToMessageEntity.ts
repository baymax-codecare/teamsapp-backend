import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFieldsToMessageEntity1644676501640 implements MigrationInterface {
    name = 'AddFieldsToMessageEntity1644676501640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages " ADD "is_sent" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "messages " ADD "is_sender_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "messages " ADD "is_receiver_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "messages " ADD "receiver_id" uuid`);
        await queryRunner.query(`ALTER TABLE "messages " ADD "receiver_phone_id" uuid`);
        await queryRunner.query(`ALTER TABLE "messages " ADD CONSTRAINT "FK_b90ca496fad420e1bf7cbbc1f50" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages " ADD CONSTRAINT "FK_c27ac75a43d21d5dc1983a8061d" FOREIGN KEY ("receiver_phone_id") REFERENCES "phone_numbers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages " DROP CONSTRAINT "FK_c27ac75a43d21d5dc1983a8061d"`);
        await queryRunner.query(`ALTER TABLE "messages " DROP CONSTRAINT "FK_b90ca496fad420e1bf7cbbc1f50"`);
        await queryRunner.query(`ALTER TABLE "messages " DROP COLUMN "receiver_phone_id"`);
        await queryRunner.query(`ALTER TABLE "messages " DROP COLUMN "receiver_id"`);
        await queryRunner.query(`ALTER TABLE "messages " DROP COLUMN "is_receiver_deleted"`);
        await queryRunner.query(`ALTER TABLE "messages " DROP COLUMN "is_sender_deleted"`);
        await queryRunner.query(`ALTER TABLE "messages " DROP COLUMN "is_sent"`);
    }

}
