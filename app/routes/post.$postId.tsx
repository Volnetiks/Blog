import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Header from '~/components/Navbar';
import { useState } from 'react';
import Markdown from 'react-markdown';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const blog = params.postId;

  return json({ blog });
}

export default function Post() {
  const { blog } = useLoaderData<typeof loader>();

  const [markdown, setMarkdown] = useState('# Hi, Pluto!');

  return (
    <div>
      <Header activatedIndex={1} />
      <div className="prose lg:prose-xl">
        <Markdown>{markdown}</Markdown>
      </div>
    </div>
  );
}