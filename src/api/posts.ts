import type { IPost } from "../models/post";

interface IGetPostsProps {
  limit?: number;
  page?: number;
  searchQuery?: string;
}

export const getPosts = async (
  props?: IGetPostsProps
): Promise<{ posts: IPost[], totalCount: number }> => {
  const params = new URLSearchParams();

  if (props?.limit) params.append('_limit', String(props.limit));

  if (props?.page) params.append('_page', String(props.page));

  if (props?.searchQuery && props.searchQuery.trim() !== '') params.append('title_like', props.searchQuery);

  const queryString = params.toString();
  const url = queryString ? `/api/posts?${queryString}` : '/api/posts';
  
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const postsData: IPost[] = await res.json();
  const totalCount = Number(res.headers.get('x-total-count')) || 100;
  
  return { posts: postsData, totalCount: totalCount };
}

interface ICreatePostProps {
  title: string;
  body: string;
  userId: number;
}

export const createPost = async (
  props: ICreatePostProps
) : Promise<IPost> => {
  const res = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify(props),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const newPost: IPost = await res.json();
  return newPost;
}

