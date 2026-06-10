export interface Iuser {
    name: string,
    email: string,
    password: string,
    age: number,
    is_active?: boolean
    role?: "admin" | "agent" | "user"
}

export interface IupdateUser {
    name?: string,
    password?: string,
    age?: number,
    is_active?: boolean
}