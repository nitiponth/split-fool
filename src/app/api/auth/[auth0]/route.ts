import {
  handleAuth,
  handleLogin,
  handleCallback,
  AfterCallback,
  AfterCallbackAppRoute,
} from "@auth0/nextjs-auth0";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const key = process.env.SUPABASE_JWT_SECRET!;

interface Session {
  [key: string]: any;
}

const afterCallback = (req: NextRequest, session: Session) => {
  const payload = {
    userId: session.user.sub,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  };

  session.user.accessToken = jwt.sign(payload, key);

  return session;
};
export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/",
  }),
  callback: handleCallback({
    afterCallback: afterCallback as unknown as AfterCallback,
  }),
  signup: handleLogin({
    authorizationParams: {
      screen_hint: "signup",
    },
    returnTo: "/",
  }),
});
