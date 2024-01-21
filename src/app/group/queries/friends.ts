import { supabase } from "@/app/db/supabase-client";
import { QueryData } from "@supabase/supabase-js";

export const getFriends = supabase.from("friend").select(
  `
            id,
            users (
              id,
              name,
              profile
            )
  `
);

export type Friends = QueryData<typeof getFriends>;
