import React from "react";

interface DeletePopupProps {
	onClose: () => void;
	submit: () => void;
	title: string;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ onClose, submit, title }) => {
	return (
		<div className="fixed w-full h-full bg-tint z-[999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
			<div className="w-[450px] h-[325px] bg-foreground rounded-[32px] p-[24px] px-[43px] shadow-md">
				<div className="w-full h-full flex flex-col justify-center items-center">
					<div className="row justify-content-center">
						<div className="text-[25.72px] flex flex-col items-center">
							<span className="text-title">{title}</span>
							<p className="text-subtitle my-4">Are you sure you want to delete this post?</p>
							<div className="flex justify-between gap-4 d-flex justify-content-between mt-5">
								<button
									type="button"
									onClick={onClose}
									className="bg-primaryBtn rounded-full text-title text-xl w-full py-2 px-5">
									Cancel
								</button>
								<button
									type="button"
									onClick={submit}
									className="bg-danger rounded-full text-title text-xl w-full  py-2 px-5">
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeletePopup;
