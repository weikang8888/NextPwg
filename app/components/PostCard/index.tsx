import React from "react";
import Image from "next/image";
import PWG from "../../assets/pwg.png";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  date: string;
  tags: string[];
}

interface PostCardProps {
  posts: Post[];
  onDeletePost: (postId: number) => void;
  onEditPost: (postId: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ posts, onDeletePost, onEditPost }) => {
  return (
    <div className="row grid grid-cols-3 gap-4">
      {posts?.map((post) => (
        <div key={post.id} className="mb-4">
          <div className="flex flex-col justify-between rounded-lg p-4 px-8 bg-white h-full">
            <div className="flex justify-between items-center">
              <span className="text-xs text-primary">{new Date(post.date).toISOString().split("T")[0]}</span>
              <Image src={PWG} alt="PWG" className="pwg-image" />
            </div>
            <h5 className="text-2xl break-words whitespace-pre-wrap">{post.title}</h5>
            <div className="text-base break-words whitespace-pre-wrap max-h-[150px] overflow-hidden flex-1">{post.body}</div>
            <div className="flex gap-4 mt-2 flex-wrap">
              {post.tags.map((tag, index) => (
                <span key={index} className="rounded-lg p-[5px] px-[9px] text-sm bg-secondary">
                  {tag}
                </span>
              ))}
            </div>
            <div className="gap-4 flex justify-between mt-4">
              <button className="w-full rounded-3xl p-[4px] px-[10px] bg-mint" onClick={() => onEditPost(post.id)}>
                Edit
              </button>
              <button className="w-full rounded-3xl p-[4px] px-[10px] bg-primary">View</button>
              <button className="w-full rounded-3xl p-[4px] px-[10px] bg-danger" onClick={() => onDeletePost(post.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
