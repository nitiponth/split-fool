export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      expense: {
        Row: {
          created_at: string;
          group_id: number;
          id: number;
          name: string;
          transaction_id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          group_id: number;
          id?: number;
          name: string;
          transaction_id: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          group_id?: number;
          id?: number;
          name?: string;
          transaction_id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "expense_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "group";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "expense_transaction_id_fkey";
            columns: ["transaction_id"];
            isOneToOne: false;
            referencedRelation: "transaction";
            referencedColumns: ["id"];
          }
        ];
      };
      friend: {
        Row: {
          created_at: string;
          friend_id: string;
          id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          friend_id: string;
          id?: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          friend_id?: string;
          id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "friend_friend_id_fkey";
            columns: ["friend_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      group: {
        Row: {
          created_at: string;
          created_by: string;
          id: number;
          name: string;
          profile_url: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          id?: number;
          name: string;
          profile_url?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          id?: number;
          name?: string;
          profile_url?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "group_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      member: {
        Row: {
          created_at: string;
          group_id: number | null;
          id: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          group_id?: number | null;
          id?: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          group_id?: number | null;
          id?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "member_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "group";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "member_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      transaction: {
        Row: {
          amount: number;
          created_at: string;
          debtor_id: string;
          expense_id: number;
          id: number;
          payer_id: string;
          updated_at: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          debtor_id: string;
          expense_id: number;
          id?: number;
          payer_id: string;
          updated_at?: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          debtor_id?: string;
          expense_id?: number;
          id?: number;
          payer_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "transaction_debtor_id_fkey";
            columns: ["debtor_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transaction_expense_id_fkey";
            columns: ["expense_id"];
            isOneToOne: false;
            referencedRelation: "expense";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transaction_payer_id_fkey";
            columns: ["payer_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          bank: string | null;
          bank_account: string | null;
          created_at: string;
          email: string | null;
          id: string;
          name: string;
          phone: string | null;
          profile: string | null;
          prompt_pay: string | null;
          sub: string | null;
          updated_at: string;
        };
        Insert: {
          bank?: string | null;
          bank_account?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          name: string;
          phone?: string | null;
          profile?: string | null;
          prompt_pay?: string | null;
          sub?: string | null;
          updated_at?: string;
        };
        Update: {
          bank?: string | null;
          bank_account?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          name?: string;
          phone?: string | null;
          profile?: string | null;
          prompt_pay?: string | null;
          sub?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
