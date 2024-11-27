import NewPostForm from "@/features/posts/components/new-post-form";

export default function PostsPage() {
  return (
    <div>
      <h1 className="font-bold">Posts</h1>
      <NewPostForm className="my-6" />
    </div>
  );
}
