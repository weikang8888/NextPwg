"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TotalPost from "./components/TotalPost";
import PostCard from "./components/PostCard";
import { getAllAccounts, getAllPosts, getUserPosts } from "./api";
import { jwtDecode } from "jwt-decode";
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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const token = localStorage.getItem("token");
  const page = 1;
  const limit = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      if (!token) {
        setError("User is not logged in");
        return;
      }

      try {
        const decodedToken: any = jwtDecode(token as string);
        setRole(decodedToken.role);

        setLoading(true);

        const userPostsResponse = await getUserPosts(token as string, page, limit);
        setUserPosts(userPostsResponse.data || []);
        setMyTotalPosts(userPostsResponse.totalPosts || 0);

        if (decodedToken.role === "admin") {
          const allPostsResponse = await getAllPosts(token as string, page, limit);
          setTotalPosts(allPostsResponse.totalPosts || 0);
          const getAllAccountsResponse = await getAllAccounts(token as string);
          setTotalAccounts(getAllAccountsResponse.accounts.length);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <header className="flex justify-between items-center py-5">
        <button type="button" className="bg-primary px-4 py-2 rounded-3xl">
          Add New Post
        </button>
        <span
          className="text-danger cursor-pointer"
          onClick={() => {
            router.push("/login");
          }}>
          Logout
        </span>
      </header>

      <div className="text-center mt-3 mb-4 text-4xl">Post List</div>

      {role === "admin" && (
        <TotalPost myTotalPosts={myTotalPosts} totalAccount={totalAccounts} totalPosts={totalPosts} />
      )}

      <PostCard posts={userPosts} />

      <div className="flex justify-center p-5">
        <button className="rounded-md p-[5px] px-[9px] ms-3 bg-primary">1</button>
      </div>
    </div>
  );
}
