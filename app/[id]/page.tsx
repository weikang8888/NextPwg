"use client";

import LoginRoute from "@/app/components/LoginRoute/LoginRoute";
import { viewPost } from "../api";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Post {
	id: number;
	title: string;
	body: string;
	date: string;
	tags: string[];
}

export default function PostDetail({ params }: { params: Promise<{ id: number }> }) {
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const { id } = await params;
				const token = localStorage.getItem("token");

				const postData = await viewPost(token as string, id);
				setPost(postData);
			} catch (err: any) {
				setError(err.message || "Failed to fetch post");
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, [params]);

	if (loading) {
		return <div className="text-center mt-10">Loading...</div>;
	}

	if (error) {
		return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
	}

	return (
		<div className="container mx-auto px-4 py-14">
			<header className="flex justify-between items-center py-5">
				<Link href="/" type="button" className="bg-primaryBtn px-10 py-2 rounded-3xl">
					Back
				</Link>
				<LoginRoute />
			</header>

			<div className="mt-6">
				<h1 className="text-title text-3xl text-center mb-16">View Post</h1>
				<div className="bg-foreground shadow rounded-lg px-20 pt-24 pb-20">
					<h1 className="text-title text-3xl mb-6">{post?.title}</h1>
					<p className=" text-subtitle mb-6">{post?.body}</p>

					<div className="mt-4">
						{post?.tags.map((tag, index) => (
							<span
								key={index}
								className="inline-block bg-tags px-4 py-1 text-sm text-black rounded-full mr-2 capitalize">
								{tag}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
