import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gkciswrmuqzocmudnmgc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrY2lzd3JtdXF6b2NtdWRubWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1MjE3NDksImV4cCI6MjA0NDA5Nzc0OX0.JEmA0nTwF5wRi6S9laUeNVrbgcLruZLltT9fvAboiOA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
