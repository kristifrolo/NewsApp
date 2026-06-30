export interface IGetPostsProps {
  limit?: number;
  page?: number;
  searchQuery?: string;
}

export interface ICreatePostProps {
  title: string;
  body: string;
  userId: number;
}