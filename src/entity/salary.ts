import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Check } from 'typeorm';
import 'reflect-metadata';
import { Employee } from './employee.ts';

@Entity({ name: 'salaries' })
export class Salary {
    @PrimaryGeneratedColumn()
    id!: number;

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
        name: 'period_start',
        type: 'date',
        nullable: false
    })
    periodStart!: Date;

    @Column({
        name: 'period_end',
        type: 'date',
        nullable: false
    })
    @Check('valid_period', 'period_end >= period_start')
    periodEnd!: Date;

    @Column({
        name: 'base_amount',
        type: 'numeric',
        precision: 12,
        scale: 2,
        nullable: false
    })
    baseAmount!: number;

    @Column({
        name: 'bonus',
        type: 'numeric',
        precision: 12,
        scale: 2,
        default: 0
    })
    bonus!: number;

    @Column({
        name: 'tax',
        type: 'numeric',
        precision: 12,
        scale: 2,
        nullable: false
    })
    tax!: number;

    @Column({
        name: 'total_paid',
        type: 'numeric',
        precision: 12,
        scale: 2,
        nullable: false
    })
    totalPaid!: number;

    @Column({
        name: 'payment_date',
        type: 'date',
        nullable: false
    })
    paymentDate!: Date;

    constructor(data?: {
        employeeId: number;
        periodStart: Date;
        periodEnd: Date;
        baseAmount: number;
        bonus?: number;
        tax: number;
        totalPaid: number;
        paymentDate: Date;
    }) {
        if (data) {
            this.employeeId = data.employeeId;
            this.periodStart = data.periodStart;
            this.periodEnd = data.periodEnd;
            this.baseAmount = data.baseAmount;
            this.bonus = data.bonus || 0;
            this.tax = data.tax;
            this.totalPaid = data.totalPaid;
            this.paymentDate = data.paymentDate;
        }
    }
}