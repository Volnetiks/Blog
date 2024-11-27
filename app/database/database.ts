import { createClient, SupabaseClient } from '@supabase/supabase-js';
import process from 'node:process';

class SupabaseService {
  private static instance: SupabaseService | null = null;
  private client: SupabaseClient | null = null;

  private constructor() {
  }

  public static getInstance(): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService();
    }

    return SupabaseService.instance;
  }

  private getClient(): SupabaseClient {
    if (!this.client) {
      const supabaseUrl = process.env.SUPABASE_URL!;
      const supabaseKey = process.env.SUPABASE_ANON_KEY!;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase Credentials');
      }

      this.client = createClient(supabaseUrl, supabaseKey);
    }

    return this.client;
  }

  public async getRecentPosts(limit: number) {
    const {
      data,
      error
    } = await this.getClient().from('posts').select('*, tags ( id, name, icon, color )').order('created_at', { ascending: false }).limit(limit);

    if (error) throw error;

    return data;
  }

  public async getPostAndTags(uuid: string) {
    const {
      data,
      error
    } = await this.getClient().from('posts').select('*, tags ( id, name, icon, color )').eq('id', uuid);

    if (error) throw error;

    return data;
  }

  public async getPostsWithTags(tags: Set<string>, url: string, key: string) {
    const client = createClient(url, key);
    const { data: tagData } = await client
      .from('tags')
      .select('id')
      .in('name', Array.from(tags));

    if (!tagData) return null;
    const tagIds = tagData.map(tag => tag.id);

    const { data, error } = await client
      .from('tags__posts')
      .select(`
          posts (
            *,
            tags__posts (
              tags (
                id,
                name
              )
            )
          )
        `)
      .in('tag_id', tagIds);

    if (error) throw error;
    if (!data) throw 'Data is empty';

    return data;
  }

  public async getAllTags() {
    const { data, error } = await this.getClient().from('tags').select('*');

    if (error) throw error;

    return data;
  }

  public async getAllProjects() {
    const { data, error } = await this.getClient().from('projects').select('*');

    if (error) throw error;

    return data;
  }
}

export const supabase = SupabaseService.getInstance();