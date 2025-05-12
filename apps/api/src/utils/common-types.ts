interface InfinitePaginationMeta {
  nextCursor: number;
  hasNextPage: boolean;
}

export interface InfinitePaginatedResponse<T> {
  data: T[];
  meta: InfinitePaginationMeta;
}

export interface MessageResponse {
  message: string;
}
