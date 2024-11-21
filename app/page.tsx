"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TotalPost from "./components/TotalPost";
import PostCard from "./components/PostCard";
import { deletePost, getAllAccounts, getAllPosts, getUserPosts } from "./api";
import { jwtDecode } from "jwt-decode";
import AddEditPostModal from "./components/AddEditPost.tsx/AddEditPostModal";

interface Post {
	id: number;
	userId: number;
	title: string;
	body: string;
	date: string;
	tags: string[];
}

export default function Home() {
	const [userPosts, setUserPosts] = useState<Post[]>([]);
	const [totalPosts, setTotalPosts] = useState<number>(0);
	const [myTotalPosts, setMyTotalPosts] = useState<number>(0);
	const [totalAccounts, setTotalAccounts] = useState<number>(0);
	const [role, setRole] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [postId, setPostId] = useState<number | null>(null);
	const [selectedPost, setSelectedPost] = useState<Post | null>(null);

	const router = useRouter();

	const token = localStorage.getItem("token");
	const page = 1;
	const limit = 10;

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			router.push("/login");
			return;
		}

		const fetchPosts = async () => {
			try {
				// Decode token to get user role
				const decodedToken: any = jwtDecode(token);
				setRole(decodedToken.role);

				// Fetch user posts
				const page = 1;
				const limit = 10;
				const userPostsResponse = await getUserPosts(token, page, limit);
				setUserPosts(userPostsResponse.data || []);
				setMyTotalPosts(userPostsResponse.totalPosts || 0);

				// If the user is admin, fetch additional data
				if (decodedToken.role === "admin") {
					const allPostsResponse = await getAllPosts(token, page, limit);
					setTotalPosts(allPostsResponse.totalPosts || 0);

					const allAccountsResponse = await getAllAccounts(token);
					setTotalAccounts(allAccountsResponse.accounts.length || 0);
				}
			} catch (err: any) {
				setError(err.message || "Failed to fetch data");
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [router]);

	const fetchLatestPosts = async () => {
		try {
			if (token) {
				const userPostsResponse = await getUserPosts(token, page, limit);
				setUserPosts(userPostsResponse.data || []);
				setMyTotalPosts(userPostsResponse.totalPosts || 0);
			}
		} catch (error: any) {
			console.error("Failed to fetch updated posts:", error.message);
		}
	};

	const handleDeletePost = async (postId: number) => {
		try {
			await deletePost(postId);
			setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
			setMyTotalPosts((prev) => prev - 1);
			if (role === "admin") {
				setTotalPosts((prev) => prev - 1);
			}
		} catch (error: any) {
			alert(error.error || "Failed to delete post");
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	const handleClickAdd = () => {
		setShowPopUp(true);
	};

	const handleClose = () => {
		setShowPopUp(false);
	};

	const handleClickEdit = (postId: number) => {
		const postToEdit = userPosts.find((post) => post.id === postId);
		if (postToEdit) {
			setSelectedPost(postToEdit);
			setPostId(postId);
			setShowPopUp(true);
		}
	};

	return (
		<div className="container mx-auto px-4">
			<header className="flex justify-between items-center py-5">
				<button type="button" className="bg-primary px-4 py-2 rounded-3xl" onClick={handleClickAdd}>
					Add New Post
				</button>
				<span
					className="text-danger cursor-pointer"
					onClick={() => {
						localStorage.removeItem("token");
						router.push("/login");
					}}>
					Logout
				</span>
			</header>

			<div className="text-center mt-3 mb-4 text-4xl">Post List</div>

			{role === "admin" && (
				<TotalPost myTotalPosts={myTotalPosts} totalAccount={totalAccounts} totalPosts={totalPosts} />
			)}

			<PostCard posts={userPosts} onDeletePost={handleDeletePost} onEditPost={handleClickEdit} />

			<div className="flex justify-center p-5">
				<button className="rounded-md p-[5px] px-[9px] ms-3 bg-primary">1</button>
			</div>

			<AddEditPostModal
				onClose={handleClose}
				initialValues={
					selectedPost
						? { title: selectedPost.title, body: selectedPost.body, tags: selectedPost.tags }
						: { title: "", body: "", tags: [] }
				}
				showPopup={showPopUp}
				postId={postId}
				onUpdatePosts={fetchLatestPosts}
			/>
		</div>
	);
}
