import { lucia, parseJwt } from '@/lib/auth';
import { db } from '@/lib/db';
import type { AstroCookies } from 'astro';
import { userTable } from 'db/schema';

export const login = async (
  cookies: AstroCookies,
  locals: App.Locals,
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  }
): Promise<boolean> => {
  const response = await fetch('http://back:8080/api/authentication/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      anonymous: locals.anonymous?.uid,
    }),
  });

  if (response.ok) {
    const jwt = await response.text();
    const { sub } = parseJwt(jwt);
    // ユーザー情報をDBに保存. もしすでに存在する場合は上書き
    await db
      .insert(userTable)
      .values({
        id: sub,
        jwt,
      })
      .onConflictDoUpdate({ target: userTable.id, set: { jwt } });
    const session = await lucia.createSession(sub, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    cookies.delete('anonymous');
    return true;
  }
  return false;
};

export const signout = async (
  locals: App.Locals,
  cookies: AstroCookies
): Promise<void> => {
  // ログインしていない場合は何もしない
  if (!locals.session) {
    return;
  }
  // ログアウト処理
  await lucia.invalidateSession(locals.session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};
