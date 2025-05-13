"use client";

import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { DEFAULT_PROFILE_PICTURE } from "@/lib/constants";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PostItem } from "./post-item";
import { PostItemSkeleton } from "./post-item-skeleton";
import { useGetPosts } from "../api/get-posts";

const PostListSkeleton = () => {
  return Array.from({ length: 5 }).map((_, idx) => (
    <PostItemSkeleton key={idx} />
  ));
};

const ActualPostList = () => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "100px",
  });

  const {
    data: postsData,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetPosts();

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, isFetching]);

  return (
    <>
      {postsData?.pages.map((data) =>
        data.data.map((post) => (
          <PostItem
            key={post.id}
            username={post.user.name}
            avatarUrl={post.user.profile_picture ?? DEFAULT_PROFILE_PICTURE}
            createdAt={post.created_at}
            content={post.content}
            likes={26}
            replies={26}
            shares={1}
          />
        )),
      )}
      <div ref={ref}>
        {isFetching && (
          <div className="wrapper flex justify-center items-center h-20">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </>
  );
};

const PostList = () => {
  const { isLoading } = useGetPosts();

  return (
    <div className="bg-muted/30 rounded-2xl">
      <div>{isLoading ? <PostListSkeleton /> : <ActualPostList />}</div>
    </div>
  );
};

export default PostList;
