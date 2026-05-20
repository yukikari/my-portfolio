export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      skills: {
        Row: {
          id: number
          name: string
          category: string
          level: number
        }
        Insert: {
          id?: number
          name: string
          category: string
          level: number
        }
        Update: {
          id?: number
          name?: string
          category?: string
          level?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
