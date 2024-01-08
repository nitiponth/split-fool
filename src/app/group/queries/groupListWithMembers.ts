import { supabase } from "@/app/db/supabase-client";
import { QueryData } from "@supabase/supabase-js";

export const groupListWithMembers = supabase.from("group").select(
  `
            id,
            name,
            profile_url,
            member (
              id,
              user (
                user_id,
                name
              )
            )
          `
);

export type GroupListWithMembers = QueryData<typeof groupListWithMembers>;
