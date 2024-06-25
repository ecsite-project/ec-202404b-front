export const fetchWithToken = async (
  url: string,
  token?: string,
  init?: RequestInit
): Promise<Response> => {
  const headers = new Headers(init?.headers);
  headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(url, { ...init, headers });
  if (response.status === 403) {
    throw new AuthorizeError();
  }
  return response;
};

export class AuthorizeError extends Error {
  constructor() {
    super('Unauthorized');
    this.name = 'AuthorizeError';
  }
}
