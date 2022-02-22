import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigrations1645455713529 implements MigrationInterface {
    name = 'initialMigrations1645455713529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "phoneNumbers" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phoneNumber" character varying(50) NOT NULL, CONSTRAINT "PK_de6ffabe7497dc7855502e2a6ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "preferredUsername" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying(50), "caseOfUsing" character varying(50), "status" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "bandwidthNumberId" uuid, CONSTRAINT "REL_0ff5098a48dfa592c4b1dcca20" UNIQUE ("bandwidthNumberId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_84435e9948b1ce6e96802a194d" ON "users" ("preferredUsername") `);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying, "phoneNumber" character varying NOT NULL, "isHidden" boolean NOT NULL DEFAULT 'false', "userId" uuid, CONSTRAINT "UQ_4e47a45a83eaebee77a193b5b7e" UNIQUE ("phoneNumber"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages " ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sms" character varying(255) NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "isSent" boolean NOT NULL DEFAULT false, "isSenderDeleted" boolean NOT NULL DEFAULT false, "isReceiverDeleted" boolean NOT NULL DEFAULT false, "senderId" uuid, "receiverId" uuid, CONSTRAINT "PK_8ae4a840c90d08677a68bf7a1bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0ff5098a48dfa592c4b1dcca206" FOREIGN KEY ("bandwidthNumberId") REFERENCES "phoneNumbers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages " ADD CONSTRAINT "FK_ad415cc778a5d2436d8929ee43d" FOREIGN KEY ("senderId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages " ADD CONSTRAINT "FK_ca4d7a6c36c3c83983ffae4b28d" FOREIGN KEY ("receiverId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages " DROP CONSTRAINT "FK_ca4d7a6c36c3c83983ffae4b28d"`);
        await queryRunner.query(`ALTER TABLE "messages " DROP CONSTRAINT "FK_ad415cc778a5d2436d8929ee43d"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0ff5098a48dfa592c4b1dcca206"`);
        await queryRunner.query(`DROP TABLE "messages "`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_84435e9948b1ce6e96802a194d"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "phoneNumbers"`);
    }

}
