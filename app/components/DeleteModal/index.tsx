import React from "react";

interface DeletePopupProps {
  onClose: () => void;
  submit: () => void;
  title: string;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ onClose, submit, title }) => {
  return (
    <div className="fixed w-[450px] h-[325px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[32px] p-[24px] px-[43px] shadow-md z-[999]">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="row justify-content-center">
          <div className="text-[25.72px] flex flex-col items-center">
            <span className="text-secondary">{title}</span>
            <p className="text-black my-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-between gap-4 d-flex justify-content-between mt-5 px-4">
              <button type="button" onClick={onClose} className="bg-accent border-2 border-accent rounded-lg text-black w-full p-2">
                Cancel
              </button>
              <button type="button" onClick={submit} className="rounded-lg border-0 px-2 bg-red-500 text-black p-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
