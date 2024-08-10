import { Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'Earning'})
export class Earning {
    @PrimaryGeneratedColumn('uuid')
    id: number;
}
