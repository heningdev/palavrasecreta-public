import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "Ur Project URL";
const supabaseKey = "Ur API Key";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
