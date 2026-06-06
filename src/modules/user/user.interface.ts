export interface Iuser {
    name: string,
    email: string,
    password: string,
    age: number,
    is_active?: boolean
}

export interface IupdateUser {
    name?: string,
    password?: string,
    age?: number,
    is_active?: boolean
}