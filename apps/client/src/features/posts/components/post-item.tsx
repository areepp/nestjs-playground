import { formatRelative } from "date-fns";
import { MessageCircle, Heart } from "lucide-react";
import Image from "next/image";

interface PostItemProps {
  username: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
  likes: number;
  replies: number;
  shares: number;
}

export function PostItem({
  username,
  avatarUrl,
  createdAt,
  content,
  likes,
  replies,
  shares,
}: Readonly<PostItemProps>) {
  return (
    <div className="flex gap-4 p-4 border-b border-white/10 last:border-b-0">
      <div className="h-10 w-10 rounded-full overflow-hidden relative">
        <Image
          src={avatarUrl}
          alt={`${username}'s avatar`}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-semibold text-white text-base">{username}</span>
          <span className="text-sm">
            {formatRelative(new Date(createdAt), new Date())}
          </span>
        </div>
        <p className="text-white mt-1">{content}</p>
        <div className="flex gap-6 text-sm text-muted-foreground mt-3">
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {replies}
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {likes}
          </div>
        </div>
      </div>
    </div>
  );
}
