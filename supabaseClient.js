import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qotudphbhwcqnkslrzvz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvdHVkcGhiaHdjcW5rc2xyenZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxNjk1NjYsImV4cCI6MjA0NDc0NTU2Nn0.3MCSp9Vn04xBJdCA5nsh8XhPAoZp8PER5O0OsocP9KE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
