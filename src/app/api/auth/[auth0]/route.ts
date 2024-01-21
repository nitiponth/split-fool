import { supabase } from "@/app/db/supabase-client";
import {
  handleAuth,
  handleLogin,
  handleCallback,
  AfterCallback,
  Session,
} from "@auth0/nextjs-auth0";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const key = process.env.SUPABASE_JWT_SECRET!;

const afterCallback = async (req: NextRequest, session: Session) => {
  let id;
  try {
    const { data } = await supabase
      .from("users")
      .insert({
        sub: session.user.sub,
        name: session.user.name,
        profile: session.user.picture,
        email: session.user.email,
      })
      .select("id");

    id = data?.[0]?.id;
  } catch (error) {
    console.log("🚀 ~ file: route.ts:25 ~ afterCallback ~ error:", error);
  }

  const payload = {
    userId: session.user.sub,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  };

  session.user.id = id;
  session.user.accessToken = jwt.sign(payload, key);

  return session;
};
export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/",
  }),

  signup: handleLogin({
    authorizationParams: {
      screen_hint: "signup",
    },
    returnTo: "/",
  }),
  callback: handleCallback({
    afterCallback: afterCallback as unknown as AfterCallback,
  }),
});
