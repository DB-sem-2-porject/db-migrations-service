import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration202506161729341750069775286 implements MigrationInterface {
    name = 'Migration202506161729341750069775286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "registration_date" SET DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "trading_points" ALTER COLUMN "opening_date" SET DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "product_directory" ALTER COLUMN "created_at" SET DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "last_update" SET DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "inventory_transfers" ALTER COLUMN "transfer_date" SET DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_date" SET DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "product_requests" ALTER COLUMN "request_date" SET DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "providers_product_list" ALTER COLUMN "lastUpdate" SET DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "sale_date" SET DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "registration_date" SET DEFAULT ('now'::text)::date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "registration_date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "sale_date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "providers_product_list" ALTER COLUMN "lastUpdate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product_requests" ALTER COLUMN "request_date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "inventory_transfers" ALTER COLUMN "transfer_date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "last_update" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product_directory" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "trading_points" ALTER COLUMN "opening_date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "registration_date" SET DEFAULT now()`);
    }

}
