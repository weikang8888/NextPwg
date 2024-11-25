import React from "react";
import Image from "next/image";
import PWG from "../../assets/pwg.png";
import { deletePost } from "../../api";
import { useRouter } from "next/navigation";

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
	const router = useRouter();

	const handleViewPost = (postId: number) => {
		router.push(`/${postId}`);
	};

	return (
		<div className="row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{posts?.map((post) => (
				<div key={post.id} className="mb-4">
					<div className="flex flex-col justify-between rounded-lg p-4 px-8 bg-[#2C2C2E] h-full">
						<span className="text-xs text-title">{new Date(post.date).toISOString().split("T")[0]}</span>
						<h5 className="text-2xl break-words whitespace-pre-wrap mt-6 text-title">{post.title}</h5>
						<div className="text-base break-words whitespace-pre-wrap max-h-[150px] overflow-hidden flex-1 mt-2 text-subtitle">
							{post.body}
						</div>
						<div className="flex gap-4 mt-2 flex-wrap">
							{post.tags.map((tag, index) => (
								<span key={index} className="rounded-full p-[5px] px-[12px] text-sm bg-tags capitalize">
									{tag}
								</span>
							))}
						</div>
						<div className="gap-4 flex justify-between mt-4">
							<button
								className="w-full rounded-3xl p-[4px] px-[10px] bg-primaryBtn"
								onClick={() => onEditPost(post.id)}>
								Edit
							</button>
							<button
								className="w-full rounded-3xl p-[4px] px-[10px] bg-secondaryBtn"
								onClick={() => handleViewPost(post.id)}>
								View
							</button>
							<button className="w-full rounded-3xl p-[4px] px-[10px] bg-accent" onClick={() => onDeletePost(post.id)}>
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
