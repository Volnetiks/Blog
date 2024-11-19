import { Button, Card, CardBody, Image, Link } from '@nextui-org/react';
import { BrainCircuit } from 'lucide-react';
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

interface MainArticleProps {
  post: Post;
}

export default function MainArticle({ post }: MainArticleProps) {
  return (
    <div className="w-4/6 h-[600px]">
      <Link href={`/post/${post.id}`} className={"w-full h-full p-0"}>
        <Card
          className="border-none bg-black dark:bg-default-100/50 w-full h-full p-0"
          shadow="sm"
        >
          <CardBody className="p-0 h-full">
            <div className="grid grid-cols-12 gap-6 h-full">
              <div className="relative col-span-12 md:col-span-5">
                <Image
                  alt="Album cover"
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
                className="flex flex-col col-span-12 md:col-span-7 px-6 h-full max-h-full overflow-hidden justify-between">
                <Button variant="bordered" className="w-fit text-white mt-8">
                  <BrainCircuit /> Artificial Intelligence
                </Button>
                <h1 className="text-5xl font-bold text-white mt-12">
                  {post.title}
                </h1>
                <div className="mt-6 overflow-y-auto text-white flex-1">
                  <p>
                    {post.description}
                  </p>
                </div>
                <div className={'my-6 text-white'}>
                  <p>
                    {post.created_at}
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
}