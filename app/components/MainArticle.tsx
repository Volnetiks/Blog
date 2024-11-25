import { Button, Card, CardBody, Image, Link } from '@nextui-org/react';
import { BrainCircuit, LucideIcon } from 'lucide-react';
import { LoaderFunctionArgs } from '@remix-run/node';
import { createClient } from '@supabase/supabase-js';
import process from 'node:process';
import { useLoaderData } from '@remix-run/react';
import Post from '~/interfaces/Post';
import PostWithTags from '~/interfaces/PostWithTags';
import Tag from '~/interfaces/Tag';
import * as LucideIcons from 'lucide-react';

interface MainArticleProps {
  post: PostWithTags;
}

export default function MainArticle({ post }: MainArticleProps) {
  const renderTagIcon = (tag: Tag) => {
    // @ts-ignore
    const Icon = LucideIcons[tag.icon] as LucideIcon;

    return (
      <div key={tag.id}>
        <Button variant="bordered" href={`/search/tag/${tag.name}`} className={`w-fit mt-2 text-white border-white`}
                as={Link}>
          <Icon /> {tag.name}
        </Button>
      </div>
    );
  };

  console.log(post.tags);

  return (
    <div className="w-4/6 h-[600px]">
      <Link href={`/post/${post.id}`} className={'w-full h-full'}>
        <Card
          className="bg-black w-full h-full"
          shadow="sm"
        >
          <CardBody className="p-0 flex flex-row h-full">
            <div className="h-full w-1/3 relative">
              <Image
                alt="Article cover"
                classNames={{
                  wrapper: 'w-full h-full',
                  img: 'w-full h-full object-cover'
                }}
                radius="none"
                shadow="md"
                src="https://nextui.org/images/album-cover.png"
              />
            </div>

            <div
              className="flex-1 flex flex-col px-6 h-full justify-between">
              <div>
                <div className={'flex flex-row gap-2 mt-8'}>
                  {post.tags.map((tag: Tag) => renderTagIcon(tag))}
                </div>
                <h1 className="text-5xl font-bold text-white mt-6">
                  {post.title}
                </h1>
                <div className="mt-6 text-white">
                  <p className={'line-clamp-10'}>
                    {post.description}
                  </p>
                </div>
              </div>
              <div className={'my-6 text-white'}>
                <p>
                  {post.created_at}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
}