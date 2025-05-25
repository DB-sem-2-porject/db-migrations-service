import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';
import { Customer } from './customer.ts';
import { Employee } from './employee.ts';
import { TradingPoint } from './trading-point.ts';
import { PaymentMethod } from './enum/payment-method.ts';


@Entity({ name: 'sales' })
export class Sale {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        name: 'trading_point_id',
        type: 'int',
        nullable: false
    })
    tradingPointId!: number;

    @ManyToOne(() => TradingPoint)
    @JoinColumn({ name: 'trading_point_id' })
    tradingPoint!: TradingPoint;

    @Column({
        name: 'employee_id',
        type: 'int',
        nullable: false
    })
    employeeId!: number;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'employee_id' })
    employee!: Employee;

    @Column({
        name: 'customer_id',
        type: 'int',
        nullable: true
    })
    customerId?: number;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer?: Customer;

    @Column({
        name: 'sale_date',
        type: 'timestamp',
        nullable: false,
        default: () => 'now()'
    })
    saleDate!: Date;

    @Column({
        name: 'total_amount',
        type: 'numeric',
        precision: 14,
        scale: 2,
        nullable: false
    })
    totalAmount!: number;

    @Column({
        name: 'payment_method',
        type: 'enum',
        enum: PaymentMethod,
        default: PaymentMethod.CASH,
        nullable: false
    })
    paymentMethod!: PaymentMethod;

    constructor(data?: {
        tradingPointId: number;
        employeeId: number;
        customerId?: number;
        saleDate?: Date;
        totalAmount: number;
        paymentMethod?: PaymentMethod;
    }) {
        if (data) {
            this.tradingPointId = data.tradingPointId;
            this.employeeId = data.employeeId;
            this.customerId = data.customerId;
            this.saleDate = data.saleDate || new Date();
            this.totalAmount = data.totalAmount;
            this.paymentMethod = data.paymentMethod || PaymentMethod.CASH;
        }
    }
}