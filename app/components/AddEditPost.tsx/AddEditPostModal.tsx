"use client";

import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { addPost, editPost } from "@/app/api";

const { Option } = Select;

const tagsOptions = ["history", "american", "crime", "science", "fiction", "fantasy", "space", "adventure", "nature", "environment", "philosophy", "psychology", "health"];

interface AddEditPostModalProps {
  onClose: () => void;
  initialValues?: FormData;
  showPopup: boolean;
  postId: number | null;
  onUpdatePosts: () => void;
}

interface FormData {
  title: string;
  body: string;
  tags: string[];
}

const AddEditPostModal: React.FC<AddEditPostModalProps> = ({ onClose, initialValues, showPopup, postId, onUpdatePosts }) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    body: "",
    tags: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!showPopup) {
      setFormData({ title: "", body: "", tags: [] });
      setErrors({});
    } else if (initialValues) {
      setFormData(initialValues);
    }
  }, [showPopup, initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "", // Clear error for this field
    }));
  };

  const handleTagsChange = (selectedTags: string[]) => {
    setFormData({ ...formData, tags: selectedTags });

    setErrors((prevErrors) => ({
      ...prevErrors,
      tags: "", // Clear error for tags
    }));
  };

  const getValidatedValue = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.body) newErrors.body = "Content is required";
    if (formData.tags.length === 0) newErrors.tags = "At least one tag is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 ? formData : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const values = getValidatedValue();
    if (values) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User is not authenticated");
        }
        if (initialValues && postId !== null) {
          await editPost({ token, postId: postId.toString(), ...values });
        } else {
          await addPost({ token, ...values });
        }
        onClose();
        onUpdatePosts();
      } catch (error: any) {
        console.error("Error creating post:", error.message);
      }
    }
  };

  return (
    <div
      className={`fixed w-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] transition-opacity duration-300 ${showPopup ? "opacity-100 visible" : "opacity-0 invisible"}`}>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl text-center font-bold text-black">{initialValues ? "Edit Post" : "Add A Post"}</h3>
          <form onSubmit={handleSubmit} className="mt-5">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-black">
                Title
              </label>
              <input
                type="text"
                className={`w-full border-2 ${errors.title ? "border-red-500" : "border-primary"} focus:outline-none focus:border-yellow-600 p-[6px] text-black px-4`}
                id="title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="body" className="block text-sm font-medium text-black">
                Content
              </label>
              <textarea
                className={`w-full border-2 ${errors.content ? "border-red-500" : "border-primary"} focus:outline-none focus:border-yellow-600 p-[6px] text-black px-4`}
                id="body"
                value={formData.body}
                onChange={handleChange}
              />
              {errors.body && <div className="text-red-500 text-sm mt-1">{errors.body}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="tags" className="block text-sm font-medium text-black">
                Tags
              </label>
              <Select
                mode="multiple"
                value={formData.tags}
                onChange={handleTagsChange}
                style={{ width: "100%" }}
                className={`w-full border-2 ${errors.tags ? "border-red-500" : "border-primary"} focus-visible:outline-none focus:outline-none focus:border-yellow-600 p-[6px] text-black px-4`}
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                dropdownStyle={{
                  zIndex: 10000,
                }}>
                {tagsOptions.map((tag) => (
                  <Option key={tag} value={tag}>
                    {tag}
                  </Option>
                ))}
              </Select>
              {errors.tags && <div className="text-red-500 text-sm mt-1">{errors.tags}</div>}
            </div>
            <div className="flex justify-between mt-4">
              <button type="button" className="px-4 py-2 bg-[#fdeacd] rounded hover:bg-[#fcd7a5] text-black" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 text-black rounded bg-[#f8b959] hover:bg-[#f1a22a]">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditPostModal;
