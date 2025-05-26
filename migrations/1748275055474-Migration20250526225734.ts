import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration202505262257341748275055474 implements MigrationInterface {
    name = 'Migration202505262257341748275055474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
    }

}
