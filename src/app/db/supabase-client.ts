import { createClient } from "@supabase/supabase-js";
import { Database } from "../interfaces/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const getSupabase = (access_token: string | undefined) => {
  const options: Record<string, any> = {};

  if (access_token) {
    options.global = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
  }

  const supabase = createClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    options
  );

  return supabase;
};

export { getSupabase };
