import { Card, CardBody, Image, Link } from '@nextui-org/react';
import PostWithTags from '~/interfaces/PostWithTags';

interface ArticleProps {
  post: PostWithTags;
}

export default function Article({ post }: ArticleProps) {
  return (
    <Link href={`/post/${post.id}`} className={'lg:w-1/6 w-4/5 h-[800px] lg:h-[600px]'}>
      <Card
        className="bg-white w-full h-full"
        shadow="sm"
      >
        <CardBody className="p-0 h-full w-full flex flex-col box-border">
          <div className={'h-1/2 lg:h-1/3 w-full relative'}>
            <Image
              removeWrapper={true}
              alt="Article cover"
              classNames={{
                wrapper: 'w-full h-full overflow-hidden',
                img: 'w-full h-full object-cover object-center'
              }}
              radius="none"
              shadow="md"
              src={post.image}
            />
          </div>

          <div className="flex flex-col px-6 h-2/3 overflow-hidden justify-between">
            <div className="overflow-hidden flex flex-col">
              <div>
                <h1 className="text-2xl font-bold mt-4">
                  {post.title}
                </h1>
                <div className={'min-h-0 mt-2 flex flex-col'}>
                  <p className={'text-gray-400'}>{post.tags.map((tag) => tag.name).join(', ')}</p>
                </div>
              </div>
              <div className="mt-2 flex-grow overflow-y-auto">
                <p className="break-words">
                  {post.description}
                </p>
              </div>
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