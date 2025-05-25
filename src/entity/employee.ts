import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import 'reflect-metadata';
import { EMPLOYEE_ROLE_ENUM_NAME, EmployeeRole } from './enum/employee-role.js';
import { TradingPoint } from './trading-point.js';

@Entity({ name: 'employees' })
export class Employee {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: 'full_name', type: 'varchar', length: 100 })
    fullName!: string;
    
    @Column({
        type: 'enum',
        enum: EmployeeRole,
        enumName: EMPLOYEE_ROLE_ENUM_NAME,
    })
    role!: EmployeeRole;
    
    @ManyToOne(() => TradingPoint)
    @JoinColumn({ name: 'trading_point_id' })
    tradingPoint!: TradingPoint;
    
    @Column({
        name: 'hire_date',
        type: 'date',
        default: () => 'CURRENT_DATE'
    })
    hireDate!: Date;
    
    @Column({
        name: 'base_salary',
        type: 'numeric',
        precision: 10,
        scale: 2
    })
    baseSalary!: number;
    
    @Column({
        name: 'phone',
        type: 'varchar',
        length: 20,
        nullable: true
    })
    phone?: string;
    
    @Column({
        name: 'email',
        type: 'varchar',
        length: 100,
        nullable: true
    })
    email?: string;
    
    @Column({
        name: 'active',
        type: 'boolean',
        default: true
    })
    active!: boolean;
    
    constructor(data?: {
        fullName: string;
        role: EmployeeRole;
        tradingPoint: TradingPoint;
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