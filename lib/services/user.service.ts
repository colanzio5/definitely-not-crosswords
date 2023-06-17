
import { AuthResponse, Session, User } from "@supabase/supabase-js";
import { SupabaseClient } from "../../supabase/client"
import type { Database } from "../types/database.types"

export async function getUsers() {
  return await SupabaseClient.from('Users')
    .select('id, display_name, active_games(\*)')
}

export async function getUserById(args: { id: string }) {
  return await SupabaseClient.from('Users')
    .select('id, display_name, active_games(\*)')
    .eq('id', args.id)
}

export async function signInWithPassword(args: { email: string, password: string }): Promise<{ user: User, session: Session }> {
  const { data, error } = await SupabaseClient.auth.signInWithPassword(args);
  if(!error) return data;
  else throw error;
}

export type Users = Database['public']['Tables']['game']['Row']
export type UsersResponse = Awaited<ReturnType<typeof getUsers>>
export type UsersResponseSuccess = UsersResponse['data'] & {
  users: Users[]
}