import { createClient, SupabaseClient } from '@supabase/supabase-js';
import process from 'node:process';
import Post from '~/interfaces/Post';

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

  public async retrievePostsWithFilter(selectedTags: Set<string>, term: string, client: SupabaseClient) {
    const tagsIds = Array.from(selectedTags);
    console.log(tagsIds);

    const {
      data,
      error
    } = await client.from('posts').select('*, tags ( id, name, icon, color )').ilike('title', `%${term}%`);

    console.log(data);
    const filteredData = data!.filter((post) => post.tags.some((tag: { id: string; }) => tagsIds.includes(tag.id)));
    if (error) throw error;

    return filteredData;
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