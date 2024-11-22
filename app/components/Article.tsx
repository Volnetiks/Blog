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
    <Link href={`/post/${post.id}`} className={"w-1/6 h-[600px]"}>
      <Card
        className="bg-white w-full h-full"
        shadow="sm"
      >
        <CardBody className="p-0 h-full flex flex-col">
          <div className={"h-1/3 w-full relative"}>
            <Image
              removeWrapper={true}
              alt="Article cover"
              classNames={{
                wrapper: 'w-full h-full overflow-hidden',
                img: 'w-full h-full object-cover object-center'
              }}
              radius="none"
              shadow="md"
              src="https://nextui.org/images/album-cover.png"
            />
          </div>

          <div
            className="flex flex-col px-6 h-full justify-between">
            <div className={"flex-none"}>
              <Button variant="bordered" className="w-fit border-black mt-2">
                <BrainCircuit /> Artificial Intelligence
              </Button>
              <h1 className="text-2xl font-bold mt-4">
                {post.title}
              </h1>
            </div>
            <div className="mt-2">
              <p className={"line-clamp-8"}>
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