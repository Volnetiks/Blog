import Tag from '~/interfaces/Tag';

export default interface PostWithTags {
  title: string;
  content: string;
  description: string;
  created_at: string;
  image: string;
  tags: Tag[];
  id: string;
}