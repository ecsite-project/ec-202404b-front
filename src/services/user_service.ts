import { fetchWithToken } from '@/lib/fetch';
import {
  UserInfoSchema,
  type CreateUserForm,
  type UserInfo,
} from '@/types/user_types';

export const createUser = async (user: CreateUserForm) => {
  const response = await fetch(`http://back:8080/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    return { success: true };
  }
  return {
    success: false,
    errors: await response.json(),
  };
};

export const fetchUserInfo = async (locals: App.Locals): Promise<UserInfo> => {
  const response = await fetchWithToken(
    `http://back:8080/api/getUser`,
    locals.user?.jwt,
    {
      method: 'GET',
    }
  );
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const data = await response.json();
  const parsed = UserInfoSchema.parse(data);
  return parsed;
};
