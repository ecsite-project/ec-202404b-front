import type { CreateUserForm } from '@/types/user_types';

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
    errors: await response.json().then((data) => data.errors),
  };
};
