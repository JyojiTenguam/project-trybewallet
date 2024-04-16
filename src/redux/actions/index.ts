export type UserType = {
  email: string;
};

export const USER_LOGIN = 'USER_LOGIN';

export const loginUser = (user: UserType) => ({
  type: 'USER_LOGIN',
  payload: user,
});