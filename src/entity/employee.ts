import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import 'reflect-metadata';
import { EmployeeRole } from './enum/employee-role.js';
import { TradingPoints } from './trading-points.js';

@Entity({ name: 'Employees' })
export class Employee {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    fullName!: string;

    @Column({
        type: 'enum',
        enum: EmployeeRole,
    })
    role!: EmployeeRole;

    @ManyToOne(() => TradingPoints)
    @JoinColumn({ name: 'tradingPointId' })
    tradingPoint!: TradingPoints;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    hireDate!: Date;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    baseSalary!: number;

    @Column({ type: 'varchar', length: 20, nullable: true })
    phone?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    email?: string;

    @Column({ type: 'boolean', default: true })
    active!: boolean;

    constructor(data?: {
        fullName: string;
        role: EmployeeRole;
        tradingPoint: TradingPoints;
        hireDate?: Date;
        baseSalary: number;
        phone?: string;
        email?: string;
        active?: boolean;
    }) {
        if (data) {
            this.fullName = data.fullName;
            this.role = data.role;
            this.tradingPoint = data.tradingPoint;
            this.hireDate = data.hireDate ?? new Date();
            this.baseSalary = data.baseSalary;
            this.phone = data.phone;
            this.email = data.email;
            this.active = data.active ?? true;
        }
    }
}