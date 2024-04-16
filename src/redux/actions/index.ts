import { UserType } from '../../types/types';

export const USER_LOGIN = 'USER_LOGIN';

export const loginUser = (user: UserType) => ({
  type: 'USER_LOGIN',
  payload: user,
});