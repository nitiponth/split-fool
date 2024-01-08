import { supabase } from "@/app/db/supabase-client";
import {
  handleAuth,
  handleLogin,
  handleCallback,
  AfterCallback,
} from "@auth0/nextjs-auth0";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const key = process.env.SUPABASE_JWT_SECRET!;

interface Session {
  [key: string]: any;
}

const afterCallback = async (req: NextRequest, session: Session) => {
  try {
    await supabase.from("user").insert({
      user_id: session.user.sub,
      name: session.user.name,
      profile: session.user.picture,
    });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:25 ~ afterCallback ~ error:", error);
  }

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
