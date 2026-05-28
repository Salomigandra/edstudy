export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      career_roles: {
        Row: {
          id: number
          name: string
          sort_order: number
          specialization_id: number
        }
        Insert: {
          id?: number
          name: string
          sort_order?: number
          specialization_id: number
        }
        Update: {
          id?: number
          name?: string
          sort_order?: number
          specialization_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "career_roles_specialization_id_fkey"
            columns: ["specialization_id"]
            isOneToOne: false
            referencedRelation: "specializations"
            referencedColumns: ["id"]
          },
        ]
      }
      course_entrance_exams: {
        Row: {
          course_id: number
          exam_id: number
          is_mandatory: boolean
          notes: string | null
        }
        Insert: {
          course_id: number
          exam_id: number
          is_mandatory?: boolean
          notes?: string | null
        }
        Update: {
          course_id?: number
          exam_id?: number
          is_mandatory?: boolean
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_entrance_exams_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_entrance_exams_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "entrance_exams"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category_id: number | null
          colleges: string | null
          compare_with: string[] | null
          description: string | null
          duration: string
          exam_text: string | null
          fit_for: string | null
          icon: string | null
          id: number
          is_active: boolean
          name: string
          pg_options: string[] | null
          salary_range: string | null
          search_vector: unknown
          slug: string
          sort_order: number
          stream_id: number
        }
        Insert: {
          category_id?: number | null
          colleges?: string | null
          compare_with?: string[] | null
          description?: string | null
          duration: string
          exam_text?: string | null
          fit_for?: string | null
          icon?: string | null
          id?: number
          is_active?: boolean
          name: string
          pg_options?: string[] | null
          salary_range?: string | null
          search_vector?: unknown
          slug: string
          sort_order?: number
          stream_id: number
        }
        Update: {
          category_id?: number | null
          colleges?: string | null
          compare_with?: string[] | null
          description?: string | null
          duration?: string
          exam_text?: string | null
          fit_for?: string | null
          icon?: string | null
          id?: number
          is_active?: boolean
          name?: string
          pg_options?: string[] | null
          salary_range?: string | null
          search_vector?: unknown
          slug?: string
          sort_order?: number
          stream_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "courses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "degree_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      degree_categories: {
        Row: {
          id: number
          name: string
          sort_order: number
        }
        Insert: {
          id?: number
          name: string
          sort_order?: number
        }
        Update: {
          id?: number
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      education_stages: {
        Row: {
          id: number
          label: string
          slug: string
          sort_order: number
        }
        Insert: {
          id?: number
          label: string
          slug: string
          sort_order?: number
        }
        Update: {
          id?: number
          label?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      entrance_exams: {
        Row: {
          full_name: string | null
          id: number
          level: string | null
          name: string
          slug: string
        }
        Insert: {
          full_name?: string | null
          id?: number
          level?: string | null
          name: string
          slug: string
        }
        Update: {
          full_name?: string | null
          id?: number
          level?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          class_stage: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          class_stage?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          class_stage?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quiz_options: {
        Row: {
          id: number
          option_text: string
          question_id: number
          sort_order: number
          weights: Json
        }
        Insert: {
          id?: number
          option_text: string
          question_id: number
          sort_order?: number
          weights?: Json
        }
        Update: {
          id?: number
          option_text?: string
          question_id?: number
          sort_order?: number
          weights?: Json
        }
        Relationships: [
          {
            foreignKeyName: "quiz_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          id: number
          question: string
          sort_order: number
        }
        Insert: {
          id?: number
          question: string
          sort_order?: number
        }
        Update: {
          id?: number
          question?: string
          sort_order?: number
        }
        Relationships: []
      }
      salary_ranges: {
        Row: {
          course_id: number
          id: number
          label: string
          range_text: string
          sort_order: number
        }
        Insert: {
          course_id: number
          id?: number
          label: string
          range_text: string
          sort_order?: number
        }
        Update: {
          course_id?: number
          id?: number
          label?: string
          range_text?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "salary_ranges_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_paths: {
        Row: {
          course_id: number | null
          course_name: string | null
          created_at: string
          id: string
          notes: string | null
          specialization_id: number | null
          stream_name: string | null
          user_id: string
        }
        Insert: {
          course_id?: number | null
          course_name?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          specialization_id?: number | null
          stream_name?: string | null
          user_id: string
        }
        Update: {
          course_id?: number | null
          course_name?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          specialization_id?: number | null
          stream_name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_paths_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_paths_specialization_id_fkey"
            columns: ["specialization_id"]
            isOneToOne: false
            referencedRelation: "specializations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_paths_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      specializations: {
        Row: {
          course_id: number
          id: number
          name: string
          salary_range: string | null
          sort_order: number
        }
        Insert: {
          course_id: number
          id?: number
          name: string
          salary_range?: string | null
          sort_order?: number
        }
        Update: {
          course_id?: number
          id?: number
          name?: string
          salary_range?: string | null
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "specializations_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      streams: {
        Row: {
          alt_name: string | null
          boards: string[] | null
          color: string | null
          color_bg: string | null
          color_light: string | null
          color_text: string | null
          description: string | null
          icon: string | null
          id: number
          name: string
          slug: string
          sort_order: number
          stage_id: number
        }
        Insert: {
          alt_name?: string | null
          boards?: string[] | null
          color?: string | null
          color_bg?: string | null
          color_light?: string | null
          color_text?: string | null
          description?: string | null
          icon?: string | null
          id?: number
          name: string
          slug: string
          sort_order?: number
          stage_id: number
        }
        Update: {
          alt_name?: string | null
          boards?: string[] | null
          color?: string | null
          color_bg?: string | null
          color_light?: string | null
          color_text?: string | null
          description?: string | null
          icon?: string | null
          id?: number
          name?: string
          slug?: string
          sort_order?: number
          stage_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "streams_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "education_stages"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
