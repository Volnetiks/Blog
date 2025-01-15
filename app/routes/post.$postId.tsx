import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Header from '~/components/Navbar';
import Markdown from 'react-markdown';
import invariant from 'tiny-invariant';
import { Button, Divider, Link } from '@nextui-org/react';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { supabase } from '~/database/database';
import Tag from '~/interfaces/Tag';
import PostWithTags from '~/interfaces/PostWithTags';
import React from 'react';
import Footer from '~/components/Footer';
import '~/atom-one-dark.css';
import rehypeRaw from 'rehype-raw';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.postId, 'Missing postId param');

  const data = await supabase.getPostAndTags(params.postId);

  const tags: Tag[] = [];

  data[0]['tags'].forEach((tagData: any) => {
    const tag: Tag = {
      id: tagData.id,
      name: tagData.name,
      icon: tagData.icon,
      color: tagData.color
    };

    tags.push(tag);
  });

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const date = new Date(data[0]['created_at']);

  const formattedDate = date.toLocaleString('en-US', formatOptions);

  const blog: PostWithTags = {
    title: data[0]['title'],
    content: data[0]['content'],
    description: data[0]['description'],
    created_at: formattedDate,
    image: data[0]['image'],
    tags: tags,
    id: data[0]['id']
  };

  return blog;
};

export default function PostPage() {
  const blog = useLoaderData<typeof loader>();

  const renderTagIcon = (tag: Tag) => {
    // @ts-ignore
    const Icon = LucideIcons[tag.icon] as LucideIcon;

    const color: string = 'text-' + tag.color + ' border-' + tag.color;
    console.log(color);

    return (
      <div key={tag.id}>
        <Button variant="bordered" href={`/search?tag=${encodeURIComponent(tag.name)}`} className={`w-fit mt-2`}
                style={{
                  borderColor: tag.color,
                  color: tag.color
                }} as={Link}>
          <Icon /> {tag.name}
        </Button>
      </div>
    );
  };

  const preprocessLaTeX = (content: string) => {
    const blockProcessedContent = content.replace(
      /\\\[(.*?)\\\]/gs,
      (_, equation) => `$$${equation}$$`
    );

    const inlineProcessedContent = blockProcessedContent.replace(
      /\\\((.*?)\\\)/gs,
      (_, equation) => `$${equation}$`
    );

    return inlineProcessedContent;
  };

  const pageTitle = `Thomas Béchu | ${blog.title}`;

  return (
    <main className="w-full">
      <title>{pageTitle}</title>
      <div className="w-full">
        <Header activatedIndex={1} />
        <div className="flex flex-col items-center min-w-full gap-2 mt-12">
          <div className="text-5xl font-bold text-center">
            {blog.title}
          </div>
          <div className={'text-xl text-gray-700 text-center font-bold mt-3 mb-1'}>
            Written by Thomas Béchu
          </div>
          <div className="text-gray-500 text-sm">
            {blog.created_at}
          </div>
          <div className={'flex flex-row gap-4'}>
            {blog.tags.map(renderTagIcon)}
          </div>
        </div>
        <div className="w-full my-4 px-16">
          <Divider />
        </div>
        <div className="prose lg:prose-xl flex-none justify-center min-w-full px-16">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" />
          <Markdown remarkPlugins={[remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeKatex, [rehypeHighlight, { ignoreMissing: true }], rehypeRaw]}>{preprocessLaTeX(blog.content)}</Markdown>
        </div>
      </div>
      <Divider className={'mt-8'} />
      <Footer />
    </main>
  );
}