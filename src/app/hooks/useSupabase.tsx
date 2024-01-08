import { useUser } from "@auth0/nextjs-auth0/client";
import { getSupabase } from "../db/supabase-client";

const useSupabase = () => {
  const { user } = useUser();

  const supabase = getSupabase(user?.accessToken as string);

  return supabase;
};

export default useSupabase;
