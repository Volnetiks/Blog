import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Header from '~/components/Navbar';
import HorizontalArticle from '~/components/HorizontalArticle';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu, DropdownSection,
  DropdownTrigger
} from '@nextui-org/react';
import * as LucideIcons from 'lucide-react';
import { CheckCheck, CheckIcon, LucideIcon } from 'lucide-react';
import Tag from '~/interfaces/Tag';
import Post from '~/interfaces/Post';
import { supabase } from '~/database/database';
import Footer from '~/components/Footer';
import type { Selection } from '@nextui-org/react';
import SearchBar from '~/components/SearchBar';
import { createClient } from '@supabase/supabase-js';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  let tag = null;

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

  if (url.searchParams.get('tag')) {
    const tagQuery = decodeURIComponent(url.searchParams.get('tag')!);

    tag = tagQuery === '' ? '' : tags.find((tagId) => tagId.name === tagQuery!) === null ? '' : tags.find((tagId) => tagId.name === tagQuery!)!.id;
  }

  return json({
    tag: tag ?? '',
    tags: tags,
    url: process.env.SUPABASE_URL!,
    key: process.env.SUPABASE_ANON_KEY!
  });
};

export default function Search() {
  const { tag, tags, url, key } = useLoaderData<typeof loader>();
  const [dropdownValues, setDropdownValues] = useState<Selection>(new Set(tag === '' ? [] : [tag]));
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set(tag === '' ? [] : [tag]));
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allTags, setAllTags] = useState(false);
  const client = createClient(url, key);

  const tagsButtonText = selectedTags.size === 0 ? 'Choose tags' : `${selectedTags.size} tags selected`;

  useEffect(() => {
    fetchPosts();
  }, [selectedTags, searchTerm, allTags]);

  const fetchPosts = async () => {
    const tagsIds = new Set(Array.from(tags).map((tag) => tag.id));
    const data = await supabase.retrievePostsWithFilter(selectedTags.size == 0 ? tagsIds : selectedTags, searchTerm, allTags, client);

    const tempPosts: Post[] = [];

    const formatOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    data.forEach((postData) => {
      const date = new Date(postData.created_at);

      const formattedDate = date.toLocaleString('en-US', formatOptions);

      const post: Post = {
        id: postData.id,
        created_at: formattedDate,
        title: postData.title,
        description: postData.description,
        content: postData.content,
        image: postData.image
      };

      tempPosts.push(post);
    });

    setPosts(tempPosts);
  };

  const renderTagIcon = (tag: Tag) => {
    // @ts-ignore
    const Icon = LucideIcons[tag.icon] as LucideIcon;

    return (
      <Icon />
    );
  };


  return (
    <main>
      <title>Thomas Béchu</title>
      <div className="w-full">
        <Header activatedIndex={1} />
        <div className={'flex flex-col w-full px-6'}>
          <div className={'flex flex-col lg:flex-row gap-6 mx-4 mb-12 mt-6 w-full'}>
            <div className={'w-3/4'}>
              <SearchBar onSearch={setSearchTerm} placeholder={'Search among posts...'} />
            </div>
            <div className={'w-min'}>
              <Dropdown>
                <DropdownTrigger>
                  <Button>{tagsButtonText}</Button>
                </DropdownTrigger>

                <DropdownMenu closeOnSelect={false} selectionMode={'multiple'}
                              onSelectionChange={setDropdownValues}
                              selectedKeys={dropdownValues}>
                  <DropdownSection title={'Tags'} showDivider>
                    {tags.map((tag) => (
                      <DropdownItem key={tag.id}
                                    onClick={() => {
                                      if (!selectedTags.has(tag.id)) {
                                        const newTags = new Set(selectedTags);
                                        newTags.add(tag.id);
                                        setSelectedTags(newTags);
                                      } else {
                                        const newTags = new Set(selectedTags);
                                        newTags.delete(tag.id);
                                        setSelectedTags(newTags);
                                      }
                                    }}
                                    startContent={renderTagIcon(tag)}
                                    description={tag.name}
                      />
                    ))}
                  </DropdownSection>
                  <DropdownSection title={'Options'}>
                    <DropdownItem key={'all-tags'} startContent={allTags ? <CheckCheck /> : <CheckIcon />}
                                  onClick={() => setAllTags(!allTags)}>
                      All tags must be in the article
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </div>
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