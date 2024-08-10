import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'profile'})
export class Profile {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'text', nullable: false })
    location: string

    @Column({ type: 'varchar', nullable: false })
    phoneNo: string

    @Column({ type: 'text', nullable: false})
    role: string;

    @Column({ type: 'text', default: 0 })
    uploads: number;

    @Column({ type: 'text', default: 'Active'})
    status: string;

    @Column({ type: 'text', default: false})
    isApproved: boolean;

}
