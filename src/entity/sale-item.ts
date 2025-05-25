import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Check } from 'typeorm';
import 'reflect-metadata';
import { Sale } from './sale.ts';
import { ProductDirectory } from './product-directory.ts';

@Entity({ name: 'sale_items' })
export class SaleItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        name: 'sale_id',
        type: 'int',
        nullable: false
    })
    saleId!: number;

    @ManyToOne(() => Sale)
    @JoinColumn({ name: 'sale_id' })
    sale!: Sale;

    @Column({
        name: 'product_id',
        type: 'int',
        nullable: false
    })
    productId!: number;

    @ManyToOne(() => ProductDirectory)
    @JoinColumn({ name: 'product_id' })
    product!: ProductDirectory;

    @Column({
        type: 'int',
        nullable: false
    })
    @Check('positive_quantity', 'quantity > 0')
    quantity!: number;

    @Column({
        type: 'numeric',
        precision: 12,
        scale: 2,
        nullable: false
    })
    @Check('positive_price', 'price > 0')
    price!: number;

    constructor(data?: {
        saleId: number;
        productId: number;
        quantity: number;
        price: number;
    }) {
        if (data) {
            this.saleId = data.saleId;
            this.productId = data.productId;
            this.quantity = data.quantity;
            this.price = data.price;
        }
    }
}