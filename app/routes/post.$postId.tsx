import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Header from '~/components/Navbar';
import Markdown from 'react-markdown';
import { createClient } from '@supabase/supabase-js'
import invariant from 'tiny-invariant';
import * as process from 'node:process';
import { Button, Divider, Link } from '@nextui-org/react';
import { BrainCircuit, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { tag } from 'postcss-selector-parser';


interface Tag {
  icon: string;
  name: string;
  id: string;
}

interface Post {
  title: string;
  content: string;
  description: string;
  created_at: string;
  tags: Tag[];
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.postId, "Missing postId param");
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

  const { data, error } = await supabase.from("posts").select("*, tags ( id, name, icon )").eq("id", params.postId);

  if (!data || error) {
    console.log(error);
    throw new Response("Not Found", { status: 404 });
  }

  const tags: Tag[] = [];

  data[0]["tags"].forEach((tagData: any) => {
    const tag: Tag = {
      id: tagData.id,
      name: tagData.name,
      icon: tagData.icon,
    }

    tags.push(tag);
  });

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const date = new Date(data[0]["created_at"]);

  const formattedDate = date.toLocaleString('en-US', formatOptions);

  const blog: Post = {
    title: data[0]["title"],
    content: data[0]["content"],
    description: data[0]["description"],
    created_at: formattedDate,
    tags: tags
  }

  return blog;
}

export default function Post() {
  const blog = useLoaderData<typeof loader>();

  const renderTagIcon = (tag: Tag)=> {
    // @ts-ignore
    const Icon = LucideIcons[tag.icon] as LucideIcon;

    return (
      <div key={tag.id}>
        <Button variant="bordered" href={"/"} className="w-fit text-black border-black mt-2" as={Link}>
          <Icon /> {tag.name}
        </Button>
      </div>
    );
  }

  return (
    <main className="w-full">
      <div className="w-full">
        <Header activatedIndex={1} />
        <div className="flex flex-col items-center min-w-full gap-2 mt-12">
          <div className="text-5xl font-bold">
            {blog.title}
          </div>
          <div className="text-gray-500 text-sm">
            {blog.created_at}
          </div>
          <div className={"flex flex-row gap-4"}>
            {blog.tags.map(renderTagIcon)}
          </div>
        </div>
        <div className="w-full my-4 px-16">
          <Divider />
        </div>
        <div className="prose lg:prose-xl flex justify-center min-w-full">
          <Markdown>{blog.content}</Markdown>
        </div>
      </div>
    </main>
  );
}