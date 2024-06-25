import {
  UserInfoSchema,
  type CreateUserForm,
  type UserInfo,
} from '@/types/user_types';

export const createUser = async (user: CreateUserForm) => {
  const response = await fetch(`http://localhost:8080/api/register`, {
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
  const response = await fetch(`http://localhost:8080/api/getUser`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${locals.user?.jwt}`,
    },
  });
  if (!response.ok) {
    throw new Error('failed to fetch user');
  }
  const data = await response.json();
  const parsed = UserInfoSchema.parse(data);
  return parsed;
};
