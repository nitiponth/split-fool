import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cdlychhkfisswbremaem.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkbHljaGhrZmlzc3dicmVtYWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwMzk3OTcsImV4cCI6MjAxOTYxNTc5N30.kniJuzajF9yW3J6_i2TFpMtLZzqbXBwK1p_4fSbEzOQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
