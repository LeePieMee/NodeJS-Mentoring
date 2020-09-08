export interface IUser {
    id: number;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type Permissions = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface Group {
    id: number;
    name: string;
    permissions: Permissions[];
}

export interface UserGroup {
    id: number;
    groupId: Group['id'];
    userId: IUser['id'];
}
