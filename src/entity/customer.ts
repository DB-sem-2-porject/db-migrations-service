import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;


  @Column({
    name: 'full_name',
    type: 'varchar',
    nullable: false,
  })
  fullName!: string;


  @Column({
    name: 'phone_number',
    type: 'varchar',
    nullable: true,
  })
  phoneNumber?: string;

  @Column({
    name: 'registration_date',
    type: 'timestamp',
    nullable: false,
    default: () => 'now()'
  })
  registrationDate?: string;

  @Column({
    name: 'birthday',
    type: 'date',
    nullable: true,
  })
  birthday?: string;

  @Column({
    name: 'notes',
    type: 'text',
    nullable: true,
  })
  notes?: string;

  constructor(data?: {
    fullName: string;
    phoneNumber?: string;
    registrationDate?: string;
    birthday?: string;
    notes?: string;
  }) {
    if (data) {
      this.fullName = data.fullName;
      this.phoneNumber = data.phoneNumber;
      this.registrationDate = data.registrationDate;
      this.birthday = data.birthday;
      this.notes = data.notes;
    }
  }
}