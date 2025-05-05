"use client";

import { match } from "ts-pattern";
import { DEFAULT_PROFILE_PICTURE } from "@/lib/constants";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PostItem } from "./post-item";
import { useGetPosts } from "../api/get-posts";

const PostList = () => {
  const { data: postsData, status } = useGetPosts({
    pagination: {
      page: 1,
      per_page: 10,
    },
  });

  return (
    <div className="bg-muted/30 rounded-2xl">
      {match(status)
        .with("pending", () => <LoadingSpinner />)
        .with("error", () => <div>Error</div>)
        .with("success", () => (
          <div>
            {postsData?.data.map((post) => (
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
            ))}
          </div>
        ))
        .exhaustive()}
    </div>
  );
};

export default PostList;
