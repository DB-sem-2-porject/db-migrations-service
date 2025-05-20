import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHalls1747766430827 implements MigrationInterface {
    name = 'AddHalls1747766430827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "resetToken" text, "registration_date" TIMESTAMP NOT NULL DEFAULT now(), "last_login" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
