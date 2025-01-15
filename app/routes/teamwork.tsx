import MainArticle from '~/components/MainArticle';
import Article from '~/components/Article';
import Header from '~/components/Navbar';
import { useLoaderData } from '@remix-run/react';
import { supabase } from '~/database/database';
import Tag from '~/interfaces/Tag';
import PostWithTags from '~/interfaces/PostWithTags';
import React from 'react';
import { Divider, Link } from '@nextui-org/react';
import Footer from '~/components/Footer';
import { MoveRight, Search } from 'lucide-react';

export const loader = async () => {

  const data = await supabase.getRecentPosts(3);

  const posts: PostWithTags[] = [];

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  data.forEach((dataItem) => {
    const tags: Tag[] = [];

    dataItem['tags'].forEach((tagData: any) => {
      const tag: Tag = {
        id: tagData.id,
        name: tagData.name,
        icon: tagData.icon,
        color: tagData.color
      };

      tags.push(tag);
    });

    const date = new Date(dataItem['created_at']);

    const formattedDate = date.toLocaleString('en-US', formatOptions);

    const post: PostWithTags = {
      title: dataItem['title'],
      description: dataItem['description'],
      content: dataItem['content'],
      created_at: formattedDate,
      image: dataItem['image'],
      tags: tags,
      id: dataItem['id']
    };

    posts.push(post);
  });

  return posts;
};

export default function Teamwork() {
  const posts = useLoaderData<typeof loader>();

  return (
    <div>
      <title>Thomas Béchu | Blog</title>
      <Header activatedIndex={4} />
      <main>
        <div className={'flex flex-col pt-6'}>
          <div className={'flex flex-row justify-end mb-2 mr-20'}>
            <Link href={'/search'} className={'font-bold text-black'}>
              <p className={'mr-2'}>Search</p>
              <Search />
            </Link>
          </div>
          <div className={'flex-col lg:flex-row hidden lg:flex lg:justify-around'}>
            <Article post={posts[0]} />
            <Article post={posts[1]} />
            <Article post={posts[2]} />
          </div>
          <div className={'flex flex-col lg:hidden items-center gap-y-16'}>
            <Article post={posts[0]} />
            <Article post={posts[1]} />
            <Article post={posts[2]} />
          </div>
        </div>
      </main>
      <Divider />
      <Footer />
    </div>
  );
}