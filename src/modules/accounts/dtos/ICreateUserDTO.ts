interface ICreateUserDTO {
    name: string;
    username: string;
    password: string;
    driver_license: string;
    id?: string;
    avatar?: string;
}

export { ICreateUserDTO };
