import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import Header from '~/components/Navbar';
import HorizontalArticle from '~/components/HorizontalArticle';
import { useState } from 'react';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { createClient } from '@supabase/supabase-js';
import process from 'node:process';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Post {
  title: string;
  description: string;
  created_at: string;
  id: string;
}

interface Tag {
  icon: string;
  name: string;
  color: string;
  id: string;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.tag, 'Missing tag param');

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

  const { data, error } = await supabase.from('tags').select('*');

  if (!data || error) {
    console.log(error);
    throw new Response('Not Found', { status: 404 });
  }

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

  return json({ tag: params.tag, tags: tags });
};

export default function Post() {
  const { tag, tags } = useLoaderData<typeof loader>();
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set([tag]));

  const post: Post = {
    title: 'test',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae libero fringilla, pellentesque leo sit amet, egestas nulla. Nullam dignissim, eros in congue dignissim, sapien nunc volutpat urna, ut blandit arcu lacus auctor est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dictum velit ut massa maximus, et luctus mauris imperdiet. Etiam nisi nisi, sagittis non blandit quis, congue sed est. Etiam non sapien quam. Aenean tincidunt bibendum bibendum. Fusce mattis, erat ut auctor pharetra, diam lorem ultricies diam, et scelerisque mi lorem ac augue. Mauris eros mi, dapibus eu pharetra id, cursus vel ante. Nulla vel erat ac odio condimentum fermentum. Nullam sodales, eros in pellentesque pulvinar, metus massa pellentesque arcu, eu sollicitudin leo odio at lectus. Quisque ornare mauris quis sem iaculis, a vehicula justo iaculis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec quis turpis lacinia nulla eleifend pretium a varius arcu. Phasellus ut accumsan metus.',
    created_at: 'now',
    id: 'prout'
  };

  const renderTagIcon = (tag: Tag) => {
    // @ts-ignore
    const Icon = LucideIcons[tag.icon] as LucideIcon;

    return (
      <div key={tag.name} className={'flex gap-2 items-center'}>
        <Button variant="bordered" className={`w-fit mt-2`} style={{
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
              className={'h-[50px]'}
              // @ts-ignore
              onSelectionChange={setSelectedTags}
              renderValue={(items) => {
                return (
                  <div className={'flex flex-row gap-4'}>
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
          <HorizontalArticle post={post} />
        </div>
      </div>
    </main>
  );
}