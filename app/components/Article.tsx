import { Button, Card, CardBody, CardFooter, Image, Link } from '@nextui-org/react';
import { BrainCircuit } from 'lucide-react';

interface Post {
  title: string;
  description: string;
  created_at: string;
  id: string;
}

interface ArticleProps {
  post: Post;
}

export default function Article({ post }: ArticleProps) {
  return (
    <Link href={`/post/${post.id}`} className={"w-1/6 h-[600px] p-0 m-0"}>
      <Card
        className="border-none bg-white dark:bg-default-100/50 w-full h-full p-0 m-0"
        shadow="sm"
      >
        <CardBody className="overflow-hidden p-0 m-0">
          <Image
            alt="Album cover"
            className="object-cover"
            height={200}
            width={325}
            src="https://nextui.org/images/album-cover.png"
            radius="none"
            shadow="md"
          />

          <div
            className="flex flex-col col-span-12 md:col-span-7 px-6 h-full max-h-full overflow-hidden justify-between">
            <Button variant="bordered" className="w-fit border-black mt-8">
              <BrainCircuit /> Artificial Intelligence
            </Button>
            <h1 className="text-2xl font-bold mt-4">
              {post.title}
            </h1>
            <div className="mt-6 overflow-y-auto flex-1">
              <p>
                {post.description}
              </p>
            </div>
            <div className={'my-6'}>
              <p>
                {post.created_at}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}