import { lucia } from '@/lib/auth';
import { AuthorizeError } from '@/lib/fetch';
import { defineMiddleware } from 'astro:middleware';
const auth = defineMiddleware(async (context, next) => {
  const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    context.locals.user = null;
    context.locals.session = null;
    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }
  context.locals.user = user;
  context.locals.session = session;
  return next();
});

const routing = defineMiddleware(async (context, next) => {
  // 未ログインの場合、ログインページにリダイレクト
  if (
    context.locals.user == null &&
    !context.url.pathname.startsWith('/auth')
  ) {
    return context.redirect('/auth/login');
  }

  return next();
});

// JWT認証に失敗した場合、ログインページにリダイレクト
const jwt = defineMiddleware(async (context, next) => {
  try {
    return await next();
  } catch (e: unknown) {
    if (e instanceof AuthorizeError) {
      return context.redirect('/auth/login');
    }
    throw e;
  }
});

export const anonymous = defineMiddleware(async (context, next) => {
  const uid = context.cookies.get('anonymous')?.value;
  context.locals.anonymous = uid ? { uid } : null;

  if (context.locals.user == null && context.locals.anonymous == null) {
    const anonymousUid = crypto.randomUUID();
    context.locals.anonymous = { uid: anonymousUid };
    context.cookies.set('anonymous', anonymousUid, {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'strict',
      httpOnly: true,
    });
  }
  return next();
});
// export const onRequest = sequence(auth, routing, jwt, anonymous);
