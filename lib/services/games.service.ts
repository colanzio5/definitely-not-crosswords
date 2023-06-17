
import { SupabaseClient } from "../../supabase/client"
import type { Database } from "../types/database.types"

async function getGames() {
  return await SupabaseClient.from('Games').select('id, title, actors(\*)')
}

type Games = Database['public']['Tables']['game']['Row']
type GamesResponse = Awaited<ReturnType<typeof getGames>>
type GamesResponseSuccess = GamesResponse['data'] & {
  actors: Games[]
}