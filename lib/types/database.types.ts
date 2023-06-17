export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      _completed_gameTousers: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_completed_gameTousers_A_fkey"
            columns: ["A"]
            referencedRelation: "completed_game"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_completed_gameTousers_B_fkey"
            columns: ["B"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      active_game: {
        Row: {
          created_at: string
          game_id: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          game_id: string
          id: string
          updated_at: string
          user_id: string
        }
        Update: {
          created_at?: string
          game_id?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "active_game_game_id_fkey"
            columns: ["game_id"]
            referencedRelation: "game"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "active_game_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      completed_game: {
        Row: {
          completed_game_stats_id: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          completed_game_stats_id: string
          created_at?: string
          id: string
          updated_at: string
        }
        Update: {
          completed_game_stats_id?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "completed_game_completed_game_stats_id_fkey"
            columns: ["completed_game_stats_id"]
            referencedRelation: "completed_game_stats"
            referencedColumns: ["id"]
          }
        ]
      }
      completed_game_stats: {
        Row: {
          completed_at: string | null
          id: string
        }
        Insert: {
          completed_at?: string | null
          id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
        }
        Relationships: []
      }
      game: {
        Row: {
          created_at: string
          id: string
          published: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          published?: boolean
          title: string
          updated_at: string
        }
        Update: {
          created_at?: string
          id?: string
          published?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      game_actions: {
        Row: {
          active_game_id: string
          created_at: string
          id: string
        }
        Insert: {
          active_game_id: string
          created_at?: string
          id: string
        }
        Update: {
          active_game_id?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_actions_active_game_id_fkey"
            columns: ["active_game_id"]
            referencedRelation: "active_game"
            referencedColumns: ["id"]
          }
        ]
      }
      question: {
        Row: {
          answer: string
          direction: Database["public"]["Enums"]["question_direction_enum"]
          game_id: string
          id: string
          number: number
          question_text: string
          root_x: number
          root_y: number
        }
        Insert: {
          answer: string
          direction?: Database["public"]["Enums"]["question_direction_enum"]
          game_id: string
          id: string
          number: number
          question_text: string
          root_x: number
          root_y: number
        }
        Update: {
          answer?: string
          direction?: Database["public"]["Enums"]["question_direction_enum"]
          game_id?: string
          id?: string
          number?: number
          question_text?: string
          root_x?: number
          root_y?: number
        }
        Relationships: [
          {
            foreignKeyName: "question_game_id_fkey"
            columns: ["game_id"]
            referencedRelation: "game"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      question_direction_enum: "DOWN" | "ACROSS"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

