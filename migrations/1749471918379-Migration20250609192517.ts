import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration202506091925171749471918379 implements MigrationInterface {
    name = 'Migration202506091925171749471918379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "providers" ALTER COLUMN "address" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "providers" ALTER COLUMN "address" SET NOT NULL`);
    }

}
