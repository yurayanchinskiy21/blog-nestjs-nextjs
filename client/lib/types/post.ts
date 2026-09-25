export interface IMetaOption {
  id: number;
  metaValue: string;
  createDate: string;
  updateDate: string;
}

export interface IPost {
  id: number;
  title: string;
  postType: string;
  slug: string;
  status: string;
  content: string | null;
  schema: string | null;
  featuredImageUrl: string | null;
  publishOn: string;
  metaOptions: IMetaOption | null;

  author: IAuthor;
  tags: ITag[];
  comments: IComment[];
}

export interface IAuthor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user?: IAuthor;
}

export interface ITag {
  id: number;
  name: string;
  slug: string;
  description: string;
  schema: string;
  featuredImageUrl: string;
  createDate: string;
  updateDate: string;
  deletedAt: string | null;
}

export interface IPaginatedPosts {
  data: IPost[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
  links: {
    first: string;
    last: string;
    current: string;
    next: string;
    previous: string;
  };
}

export interface IApiResponse<T> {
  apiVersion: string;
  data: T;
}

export interface ICreatePostForm {
  title: string;
  postType: string;
  slug: string;
  status: string;
  content: string;
  schema: string;
  featuredImageUrl: string;
  publishOn: string;
  tags: number[];
}
