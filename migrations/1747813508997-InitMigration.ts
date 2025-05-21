import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1747813508997 implements MigrationInterface {
    name = 'InitMigration1747813508997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "reset_token" text, "registration_date" TIMESTAMP NOT NULL DEFAULT now(), "last_login" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."trading_points_type_enum" AS ENUM('Универмаг', 'Магазин', 'Киоск', 'Лоток')`);
        await queryRunner.query(`CREATE TABLE "trading_points" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "type" "public"."trading_points_type_enum" NOT NULL, "address" text NOT NULL, "size_sqm" numeric(10,2), "rent_cost" numeric(12,2), "utility_cost" numeric(12,2), "counter_count" integer, "floors_count" integer NOT NULL DEFAULT '1', "opening_date" date NOT NULL DEFAULT now(), "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_5ae1b6fbd79b5b8d6cbf73815ad" UNIQUE ("name"), CONSTRAINT "PK_6a78152f83331e9991d843ab0ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "providers" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "phone" character varying(20), "email" character varying(100), "address" text NOT NULL, "active" boolean NOT NULL DEFAULT true, "registration_date" date NOT NULL DEFAULT ('now'::text)::date, CONSTRAINT "PK_af13fc2ebf382fe0dad2e4793aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."product_category" AS ENUM('None', 'Category1', 'Category2', 'Category3', 'Category4', 'Category5')`);
        await queryRunner.query(`CREATE TYPE "public"."measurement_type" AS ENUM('SingleUnit', 'Kilogram', 'Litre')`);
        await queryRunner.query(`CREATE TABLE "product_directory" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text, "category" "public"."product_category" NOT NULL, "measurement" "public"."measurement_type" NOT NULL, "created_at" date NOT NULL DEFAULT now(), CONSTRAINT "PK_7c4fec3d0cb6363ffb63f9c55fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "providers_product_list" ("id" SERIAL NOT NULL, "price" numeric(12,2) NOT NULL, "minOrderQuantity" integer NOT NULL DEFAULT '1', "active" boolean NOT NULL DEFAULT true, "lastUpdate" TIMESTAMP NOT NULL DEFAULT now(), "provider_id" integer, "product_id" integer, CONSTRAINT "PK_229ce44a173ddb5708cfe3a300f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_status" AS ENUM('New', 'Shipped', 'Sent', 'Completed', 'Canceled')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "order_date" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."order_status" NOT NULL, "total_cost" numeric(10,2) NOT NULL, "notes" text DEFAULT '', "provider_id" integer NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."employee_role" AS ENUM('Role1', 'Role2', 'Role3', 'Role4', 'Role5')`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" SERIAL NOT NULL, "full_name" character varying(100) NOT NULL, "role" "public"."employee_role" NOT NULL, "hire_date" date NOT NULL DEFAULT ('now'::text)::date, "base_salary" numeric(10,2) NOT NULL, "phone" character varying(20), "email" character varying(100), "active" boolean NOT NULL DEFAULT true, "trading_point_id" integer, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."procurement_request_status" AS ENUM('New', 'Processed', 'Rejected')`);
        await queryRunner.query(`CREATE TABLE "procurement_requests" ("id" SERIAL NOT NULL, "request_date" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."procurement_request_status" NOT NULL, "notes" text DEFAULT '', "trading_point_id" integer NOT NULL, "employee_id" integer, CONSTRAINT "PK_c0b1fa20bfe6f8231eada515e64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department_store_sections" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "floor_number" integer NOT NULL, "trading_point_id" integer NOT NULL, "manager_id" integer, CONSTRAINT "PK_9856e28af4abb964f2a68cdb98f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trading_point_halls" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "floor_number" integer NOT NULL DEFAULT '1', "size_sqm" numeric(10,2), "trading_point_id" integer NOT NULL, "section_id" integer, CONSTRAINT "PK_87b15502aa30ee1a96ef0945ec7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "halls_assignment" ("id" SERIAL NOT NULL, "employee_id" integer, "hall_id" integer, CONSTRAINT "PK_e37d7756760da1f0ecf744584d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "procurement_request_items" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "request_id" integer NOT NULL, "product_id" integer, CONSTRAINT "PK_e8a289a349726439ca2c5f4878b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "providers_product_list" ADD CONSTRAINT "FK_4ae147d4831ec4a56cabd36a596" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "providers_product_list" ADD CONSTRAINT "FK_e55e8948ae65051b0f0ac976832" FOREIGN KEY ("product_id") REFERENCES "product_directory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_e4a8190cedd491dd878e3195baa" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_03affb72f9b20b7b171e44be69a" FOREIGN KEY ("trading_point_id") REFERENCES "trading_points"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "procurement_requests" ADD CONSTRAINT "FK_c3b8307f2e695c0839ab515a6a2" FOREIGN KEY ("trading_point_id") REFERENCES "trading_points"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "procurement_requests" ADD CONSTRAINT "FK_33b378dc1b0e8280b4ec4625f90" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "department_store_sections" ADD CONSTRAINT "FK_9a92e3508126da1b1f94dc561c3" FOREIGN KEY ("trading_point_id") REFERENCES "trading_points"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "department_store_sections" ADD CONSTRAINT "FK_fccf50cc945113738dc1c280402" FOREIGN KEY ("manager_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trading_point_halls" ADD CONSTRAINT "FK_6eeb592795c6cc3ff5ed0a05c13" FOREIGN KEY ("trading_point_id") REFERENCES "trading_points"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trading_point_halls" ADD CONSTRAINT "FK_0b1a4231c26f74681f6fd8bf23d" FOREIGN KEY ("section_id") REFERENCES "department_store_sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "halls_assignment" ADD CONSTRAINT "FK_0dc5f3e5ba470543d262c234d98" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "halls_assignment" ADD CONSTRAINT "FK_058214933d64850c83eea100bdc" FOREIGN KEY ("hall_id") REFERENCES "trading_point_halls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "procurement_request_items" ADD CONSTRAINT "FK_53053fb34963d1abea502d044b0" FOREIGN KEY ("request_id") REFERENCES "procurement_requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "procurement_request_items" ADD CONSTRAINT "FK_31026c940d349734f651460907b" FOREIGN KEY ("product_id") REFERENCES "product_directory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "procurement_request_items" DROP CONSTRAINT "FK_31026c940d349734f651460907b"`);
        await queryRunner.query(`ALTER TABLE "procurement_request_items" DROP CONSTRAINT "FK_53053fb34963d1abea502d044b0"`);
        await queryRunner.query(`ALTER TABLE "halls_assignment" DROP CONSTRAINT "FK_058214933d64850c83eea100bdc"`);
        await queryRunner.query(`ALTER TABLE "halls_assignment" DROP CONSTRAINT "FK_0dc5f3e5ba470543d262c234d98"`);
        await queryRunner.query(`ALTER TABLE "trading_point_halls" DROP CONSTRAINT "FK_0b1a4231c26f74681f6fd8bf23d"`);
        await queryRunner.query(`ALTER TABLE "trading_point_halls" DROP CONSTRAINT "FK_6eeb592795c6cc3ff5ed0a05c13"`);
        await queryRunner.query(`ALTER TABLE "department_store_sections" DROP CONSTRAINT "FK_fccf50cc945113738dc1c280402"`);
        await queryRunner.query(`ALTER TABLE "department_store_sections" DROP CONSTRAINT "FK_9a92e3508126da1b1f94dc561c3"`);
        await queryRunner.query(`ALTER TABLE "procurement_requests" DROP CONSTRAINT "FK_33b378dc1b0e8280b4ec4625f90"`);
        await queryRunner.query(`ALTER TABLE "procurement_requests" DROP CONSTRAINT "FK_c3b8307f2e695c0839ab515a6a2"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_03affb72f9b20b7b171e44be69a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_e4a8190cedd491dd878e3195baa"`);
        await queryRunner.query(`ALTER TABLE "providers_product_list" DROP CONSTRAINT "FK_e55e8948ae65051b0f0ac976832"`);
        await queryRunner.query(`ALTER TABLE "providers_product_list" DROP CONSTRAINT "FK_4ae147d4831ec4a56cabd36a596"`);
        await queryRunner.query(`DROP TABLE "procurement_request_items"`);
        await queryRunner.query(`DROP TABLE "halls_assignment"`);
        await queryRunner.query(`DROP TABLE "trading_point_halls"`);
        await queryRunner.query(`DROP TABLE "department_store_sections"`);
        await queryRunner.query(`DROP TABLE "procurement_requests"`);
        await queryRunner.query(`DROP TYPE "public"."procurement_request_status"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TYPE "public"."employee_role"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."order_status"`);
        await queryRunner.query(`DROP TABLE "providers_product_list"`);
        await queryRunner.query(`DROP TABLE "product_directory"`);
        await queryRunner.query(`DROP TYPE "public"."measurement_type"`);
        await queryRunner.query(`DROP TYPE "public"."product_category"`);
        await queryRunner.query(`DROP TABLE "providers"`);
        await queryRunner.query(`DROP TABLE "trading_points"`);
        await queryRunner.query(`DROP TYPE "public"."trading_points_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
