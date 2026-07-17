export interface IUser {
	name: string;
	email: string;
	id: number;
}

export interface IUpdateUserRequest {
	name?: string;
	email?: string;
}
