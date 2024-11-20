const BASE_URL = "https://api-for-testing-gujp.onrender.com/api";

export const login = async (email: string, password: string): Promise<{ token: string }> => {
  const response = await fetch(`${BASE_URL}/account/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Login failed");
  }

  return response.json();
};

export const register = async (username: string, email: string, password: string, role: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/account/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, role }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Registration failed");
  }

  return response.json();
};

export const getAllAccounts = async (token: string): Promise<{ accounts: [] }> => {
  const response = await fetch(`${BASE_URL}/accounts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch accounts");
  }

  return response.json();
};

export const getAllPosts = async (token: string, page: number, limit: number): Promise<{ posts: any[]; totalPosts: number }> => {
  const response = await fetch(`${BASE_URL}/posts?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch posts");
  }

  return response.json();
};

export const getUserPosts = async (token: string, page: number, limit: number): Promise<{ data: any[]; totalPosts: number }> => {
  const response = await fetch(`${BASE_URL}/posts/mypost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ page, limit }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch user posts");
  }

  return response.json();
};

export const deletePost = async (postId: number): Promise<{}> => {
  const response = await fetch(`${BASE_URL}/posts/delete/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete post");
  }

  return response.json();
};

export const addPost = async ({ token, title, body, tags }: { token: string; title: string; body: string; tags: string[] }): Promise<{ message: string }> => {
  const response = await fetch(`${BASE_URL}/posts/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, body, tags }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Post creation failed");
  }

  return response.json();
};

export const editPost = async ({ token, postId, title, body, tags }: { token: string; postId: string | number; title: string; body: string; tags: string[] }): Promise<{ message: string }> => {
  const response = await fetch(`${BASE_URL}/posts/edit/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, body, tags }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Post editing failed");
  }

  return response.json();
};

export const viewPost = async (token: string, postId: number) => {
	const response = await fetch(`${BASE_URL}/posts/view/${postId}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Failed to fetch post");
	}

	return response.json();
};
