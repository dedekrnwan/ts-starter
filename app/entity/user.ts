import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { type } from "os";


@Entity({
    name: "user"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name:string

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: false,
        comment: 'Unique username'
    })
    username:string

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: false,
        comment: 'Unique email'
    })
    email:string

    @Column({
        type: 'date',
    })
    birthdate:Date

    @Column({
        type: 'varchar',
        length: 20,
        nullable: true
    })
    phone:string

    @Column({
        type: 'varchar',
        length: 20,
        nullable: true
    })
    telephone:string

    @Column({
        type: 'text',
        nullable: true
    })
    address:string

    @Column({
        type: 'varchar',
        length: 45
    })
    category:string

    @Column({
        type: 'datetime',
        nullable: true
    })
    email_verify_date:Date

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    password:string

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    remember_token:string

    @Column({
        type: 'datetime',
        nullable: true
    })
    created_date:Date

    @OneToOne(type => User, user => user.id)
    @Column({
        type: 'int',
        nullable: true
    })
    created_by:number

    @Column({
        type: 'datetime',
        nullable: true
    })
    updated_date:Date

    @OneToOne(type => User, user => user.id)
    @Column({
        type: 'int',
        nullable: true
    })
    updated_by:number

}