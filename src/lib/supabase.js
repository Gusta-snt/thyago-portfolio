import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gnavbctyfxrmkioqznqf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduYXZiY3R5ZnhybWtpb3F6bnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NzUwOTEsImV4cCI6MjA4OTA1MTA5MX0.zGEh_EEE7071dTwz7aauKxAP6JEiHMi8BTFF4-IAgpU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
