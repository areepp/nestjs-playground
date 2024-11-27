"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePost } from "../api/create-post";

export default function NewPostForm({ className }: { className?: string }) {
  const [text, setText] = useState("");

  const { mutate, isPending } = useCreatePost();

  function onCreatePost() {
    mutate({ content: text });
    setText("");
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="What's on your mind?"
      />
      <Button
        className="self-end"
        disabled={text.length === 0}
        onClick={onCreatePost}
        isLoading={isPending}
      >
        Post
      </Button>
    </div>
  );
}
