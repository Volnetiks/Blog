import MainArticle from '~/components/MainArticle';
import Article from '~/components/Article';
import Header from '~/components/Navbar';
import { LoaderFunctionArgs } from '@remix-run/node';
import { createClient } from '@supabase/supabase-js';
import process from 'node:process';
import { useLoaderData } from '@remix-run/react';

interface Post {
  title: string;
  description: string;
  created_at: string;
  id: string;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

  const { data, error } = await supabase.from("posts").select("*").order("created_at", {ascending: false}).limit(6);

  if (!data || error) {
    throw new Response("Not Found", { status: 404 });
  }

  const posts: Post[] = [];

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  data.forEach((dataItem) => {
    const date = new Date(dataItem["created_at"]);

    const formattedDate = date.toLocaleString('en-US', formatOptions);

    const post: Post = {
      title: dataItem["title"],
      description: dataItem["description"],
      created_at: formattedDate,
      id: dataItem["id"],
    }

    posts.push(post);
  });

  return posts;
}

export default function Index() {

  const posts = useLoaderData<typeof loader>();

  return (
    <div>
      <Header activatedIndex={1} />
      <main>
        <div className={'flex flex-col pt-6'}>
          <div className={'flex-row flex justify-around'}>
            <MainArticle post={posts[0]} />
            <Article post={posts[1]} />
          </div>
          <div className={'mt-8 flex-row flex justify-around mb-16'}>
            <Article post={posts[2]} />
            <Article post={posts[3]} />
            <Article post={posts[4]} />
            <Article post={posts[5]} />
          </div>
        </div>
      </main>
    </div>
  );
}