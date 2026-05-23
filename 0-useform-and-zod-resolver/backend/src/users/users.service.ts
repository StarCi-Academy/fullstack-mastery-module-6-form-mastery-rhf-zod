import { Injectable } from "@nestjs/common"

/**
 * Kiểu User trả về cho FE (EN: User type returned to FE).
 */
export interface User {
    id: number
    email: string
}

/**
 * UsersService — lưu user signup trong RAM, đủ cho luồng demo L0.
 * (EN: UsersService — keeps signups in RAM, sufficient for L0 demo.)
 */
@Injectable()
export class UsersService {
    private nextId = 1
    private readonly users: User[] = []

    /**
     * Tạo user mới với email; trả về id incremental.
     * (EN: Create a new user with given email; returns incremental id.)
     */
    create(email: string): User {
        const user: User = { id: this.nextId++, email }
        this.users.push(user)
        return user
    }
}
