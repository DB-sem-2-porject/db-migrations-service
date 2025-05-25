import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInventoryAndOrderItems1748164162343 implements MigrationInterface {
    name = 'AddInventoryAndOrderItems1748164162343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_items" ("id" SERIAL NOT NULL, "order_id" integer NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL, "price" numeric(12,2) NOT NULL, CONSTRAINT "positive_quantity" CHECK (quantity > 0), CONSTRAINT "positive_price" CHECK (price > 0), CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("id" SERIAL NOT NULL, "trading_point_id" integer NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "selling_price" numeric(12,2) NOT NULL, "last_update" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "positive_selling_price" CHECK (selling_price > 0), CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."inventory_transfers_status_enum" AS ENUM('запланирован', 'выполнен', 'отменен')`);
        await queryRunner.query(`CREATE TABLE "inventory_transfers" ("id" SERIAL NOT NULL, "source_point_id" integer NOT NULL, "destination_point_id" integer NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL, "transfer_date" TIMESTAMP NOT NULL DEFAULT now(), "initiated_by" integer NOT NULL, "approved_by" integer, "status" "public"."inventory_transfers_status_enum" NOT NULL DEFAULT 'запланирован', CONSTRAINT "positive_quantity" CHECK (quantity > 0), CONSTRAINT "PK_0ab69c36e4239d5db7a3e149c31" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_9263386c35b6b242540f9493b00" FOREIGN KEY ("product_id") REFERENCES "product_directory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_811df61b324ab547f7b7ded71ba" FOREIGN KEY ("trading_point_id") REFERENCES "trading_points"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_732fdb1f76432d65d2c136340dc" FOREIGN KEY ("product_id") REFERENCES "product_directory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_transfers" ADD CONSTRAINT "FK_8a3931cbd96e7e67a1de7d62228" FOREIGN KEY ("source_point_id") REFERENCES "trading_points"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_transfers" ADD CONSTRAINT "FK_2e1b9dee58f28c580ed24089542" FOREIGN KEY ("destination_point_id") REFERENCES "trading_points"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_transfers" ADD CONSTRAINT "FK_a609b4f8983ccaaf9c5969286de" FOREIGN KEY ("product_id") REFERENCES "product_directory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_transfers" ADD CONSTRAINT "FK_3f60360f156162e9fea7f1b3893" FOREIGN KEY ("initiated_by") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_transfers" ADD CONSTRAINT "FK_9684cb0ae2225865b75fc4620aa" FOREIGN KEY ("approved_by") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_transfers" DROP CONSTRAINT "FK_9684cb0ae2225865b75fc4620aa"`);
        await queryRunner.query(`ALTER TABLE "inventory_transfers" DROP CONSTRAINT "FK_3f60360f156162e9fea7f1b3893"`);
        await queryRunner.query(`ALTER TABLE "inventory_transfers" DROP CONSTRAINT "FK_a609b4f8983ccaaf9c5969286de"`);
        await queryRunner.query(`ALTER TABLE "inventory_transfers" DROP CONSTRAINT "FK_2e1b9dee58f28c580ed24089542"`);
        await queryRunner.query(`ALTER TABLE "inventory_transfers" DROP CONSTRAINT "FK_8a3931cbd96e7e67a1de7d62228"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_732fdb1f76432d65d2c136340dc"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_811df61b324ab547f7b7ded71ba"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_9263386c35b6b242540f9493b00"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_145532db85752b29c57d2b7b1f1"`);
        await queryRunner.query(`DROP TABLE "inventory_transfers"`);
        await queryRunner.query(`DROP TYPE "public"."inventory_transfers_status_enum"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "order_items"`);
    }

}
