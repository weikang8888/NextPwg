"use client";

import AddEditPostModal from "./AddEditPostModal";

const AddEditPost = () => {
  const handleClose = () => {
    console.log("Modal closed");
  };

  const handleSubmit = (data: any) => {
    console.log("Submitted data:", data);
  };

  return <AddEditPostModal onClose={handleClose} submit={handleSubmit} initialValues={{ title: "", body: "", tags: [] }} showPopup={true} />;
};

export default AddEditPost;
