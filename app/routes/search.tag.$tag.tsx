import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import Header from '~/components/Navbar';
import HorizontalArticle from '~/components/HorizontalArticle';
import React, { useEffect, useState } from 'react';
import { Button, Divider, Select, SelectItem } from '@nextui-org/react';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import Tag from '~/interfaces/Tag';
import Post from '~/interfaces/Post';
import { supabase } from '~/database/database';
import Footer from '~/components/Footer';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.tag, 'Missing tag param');

  const data = await supabase.getAllTags();

  const tags: Tag[] = [];

  data.forEach((tagData: any) => {
    const tag: Tag = {
      id: tagData.id,
      name: tagData.name,
      icon: tagData.icon,
      color: tagData.color
    };

    tags.push(tag);
  });

  return json({ tag: params.tag, tags: tags, url: process.env.SUPABASE_URL!, key: process.env.SUPABASE_ANON_KEY! });
};

export default function PostPage() {
  const { tag, tags, url, key } = useLoaderData<typeof loader>();
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set([tag]));
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPostsWithTags();
  }, [selectedTags]);

  const fetchPostsWithTags = async () => {
    if (selectedTags.size > 0) {
      const data = await supabase.getPostsWithTags(selectedTags, url, key);

      const tempPosts: Post[] = [];

      const uniquePosts = data!
        .map(item => item.posts)
        .filter((post, index, self) =>
          // @ts-ignore
          index === self.findIndex((p) => p.id === post.id)
        );

      const formatOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };

      uniquePosts!.forEach((postData) => {
        const post: Post = {
          // @ts-ignore
          title: postData.title,
          // @ts-ignore
          content: postData.content,
          // @ts-ignore
          description: postData.description,
          // @ts-ignore
          image: postData.image,
          // @ts-ignore
          created_at: new Date(postData.created_at).toLocaleString('en-US', formatOptions),
          // @ts-ignore
          id: postData.id
        };

        tempPosts.push(post);
      });
      setPosts(tempPosts);
    }
  };

  const renderTagIcon = (tag: Tag) => {
    // @ts-ignore
    const Icon = LucideIcons[tag.icon] as LucideIcon;

    return (
      <div key={tag.name}>
        <Button variant="bordered" className={`w-fit`} style={{
          borderColor: tag.color,
          color: tag.color
        }}>
          <Icon /> {tag.name}
        </Button>
      </div>
    );
  };

  return (
    <main>
      <title>Thomas Béchu</title>
      <div className="w-full">
        <Header activatedIndex={1} />
        <div className={'flex flex-col w-full px-6'}>
          <div className={'text-3xl font-bold mb-12'}>
            <p className={'font-bold text-xl my-3'}>Posts about</p>
            <Select
              items={tags}
              selectionMode="multiple"
              labelPlacement="outside-left"
              placeholder="Choose the tags you're looking for."
              selectedKeys={selectedTags}
              variant="bordered"
              classNames={{
                trigger: 'h-[55px]'
              }}
              // @ts-ignore
              onSelectionChange={setSelectedTags}
              renderValue={(items) => {
                return (
                  <div className={'flex flex-row gap-4 items-center'}>
                    {items.map((item) => (
                      <div key={item.key}>
                        {renderTagIcon(item.data!)}
                      </div>
                    ))}
                  </div>
                );
              }}
            >
              {(tag: Tag) => (
                <SelectItem key={tag.name}>
                  {renderTagIcon(tag)}
                </SelectItem>
              )}
            </Select>
          </div>
          <div className={'flex flex-col gap-4'}>
            {posts.map((post: Post) => {
              return (<HorizontalArticle post={post} />);
            })}
          </div>
        </div>
      </div>
      <Divider className={'mt-8'} />
      <Footer />
    </main>
  );
}