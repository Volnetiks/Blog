import { Button, Card, CardBody, Image, Link } from '@nextui-org/react';
import { BrainCircuit } from 'lucide-react';
import { LoaderFunctionArgs } from '@remix-run/node';
import { createClient } from '@supabase/supabase-js';
import process from 'node:process';
import { useLoaderData } from '@remix-run/react';
import Post from '~/interfaces/Post';

interface HorizontalArticleProps {
  post: Post;
}

export default function HorizontalArticle({ post }: HorizontalArticleProps) {
  return (
    <div className="w-full h-52">
      <Link href={`/post/${post.id}`} className={'w-full h-52 block'}>
        <Card
          className="border-gray-200 border dark:bg-default-100/50 w-full h-52 p-0"
          shadow="sm"
        >
          <CardBody className="p-0 flex flex-row h-full box-border">
            <div className="h-full w-52">
              <Image
                alt="Album cover"
                classNames={{
                  wrapper: 'w-52 h-full',
                  img: 'w-52 h-full object-cover'
                }}
                radius="none"
                shadow="md"
                src={post.image}
              />
            </div>

            <div
              className="flex flex-col px-6 h-full max-h-full overflow-hidden justify-between">
              <div className={'flex flex-row gap-2 items-end'}>
                <h1 className="text-4xl font-bold mt-4">
                  {post.title}
                </h1>
                <p className={'text-gray-500'}>
                  - {post.created_at}
                </p>
              </div>
              <div className="mt-4 overflow-y-auto flex-1">
                <p>
                  {post.description}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
}