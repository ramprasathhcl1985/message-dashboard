export interface IUsers{
id?: number;
userName: string;
userEmail: string;
userPassword: string;
}

export interface IGroups{
    id?: number;
    groupName: string;
    groupMembers: string;
    description: string;
}

export interface IUserGroups{
    id?: number;
    groupName: string;
    groupMembers: string;
    groupId: string;
    userId: string;
}

export interface IMessages{
    id?: number;
    messageText: string;
    groupId: string;
    userId: string;
}