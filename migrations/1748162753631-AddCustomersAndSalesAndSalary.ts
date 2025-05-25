import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCustomersAndSalesAndSalary1748162753631 implements MigrationInterface {
    name = 'AddCustomersAndSalesAndSalary1748162753631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "full_name" character varying NOT NULL, "phone_number" character varying, "registration_date" TIMESTAMP NOT NULL DEFAULT now(), "birthday" date, "notes" text, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."sales_payment_method_enum" AS ENUM('наличные', 'карта', 'сбп', 'крипта', 'другое')`);
        await queryRunner.query(`CREATE TABLE "sales" ("id" SERIAL NOT NULL, "trading_point_id" integer NOT NULL, "employee_id" integer NOT NULL, "customer_id" integer, "sale_date" TIMESTAMP NOT NULL DEFAULT now(), "total_amount" numeric(14,2) NOT NULL, "payment_method" "public"."sales_payment_method_enum" NOT NULL DEFAULT 'наличные', CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale_items" ("id" SERIAL NOT NULL, "sale_id" integer NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL, "price" numeric(12,2) NOT NULL, CONSTRAINT "positive_quantity" CHECK (quantity > 0), CONSTRAINT "positive_price" CHECK (price > 0), CONSTRAINT "PK_5a7dc5b4562a9e590528b3e08ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "salaries" ("id" SERIAL NOT NULL, "employee_id" integer NOT NULL, "period_start" date NOT NULL, "period_end" date NOT NULL, "base_amount" numeric(12,2) NOT NULL, "bonus" numeric(12,2) NOT NULL DEFAULT '0', "tax" numeric(12,2) NOT NULL, "total_paid" numeric(12,2) NOT NULL, "payment_date" date NOT NULL, CONSTRAINT "valid_period" CHECK (period_end >= period_start), CONSTRAINT "PK_20ca60aa8d4201c7bcb430fdb36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_664179169563c3afe1f64426347" FOREIGN KEY ("trading_point_id") REFERENCES "trading_points"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_731ffab2e5e639ef1326117c17b" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_c51005b2b06cec7aa17462c54f5" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_items" ADD CONSTRAINT "FK_c210a330b80232c29c2ad68462a" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_items" ADD CONSTRAINT "FK_4ecae62db3f9e9cc9a368d57adb" FOREIGN KEY ("product_id") REFERENCES "product_directory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "salaries" ADD CONSTRAINT "FK_9ac79195d31e77bb6df432eab13" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salaries" DROP CONSTRAINT "FK_9ac79195d31e77bb6df432eab13"`);
        await queryRunner.query(`ALTER TABLE "sale_items" DROP CONSTRAINT "FK_4ecae62db3f9e9cc9a368d57adb"`);
        await queryRunner.query(`ALTER TABLE "sale_items" DROP CONSTRAINT "FK_c210a330b80232c29c2ad68462a"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_c51005b2b06cec7aa17462c54f5"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_731ffab2e5e639ef1326117c17b"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_664179169563c3afe1f64426347"`);
        await queryRunner.query(`DROP TABLE "salaries"`);
        await queryRunner.query(`DROP TABLE "sale_items"`);
        await queryRunner.query(`DROP TABLE "sales"`);
        await queryRunner.query(`DROP TYPE "public"."sales_payment_method_enum"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
