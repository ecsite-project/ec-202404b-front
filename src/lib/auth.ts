import { Lucia } from 'lucia';

import { adapter } from '@/lib/db';
import type { Payload } from '@/types/payload_type';

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: false,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      payload: parseJwt(attributes.jwt),
      jwt: attributes.jwt,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseSessionAttributes {}
interface DatabaseUserAttributes {
  jwt: string;
}

export function parseJwt(token: string): Payload {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
