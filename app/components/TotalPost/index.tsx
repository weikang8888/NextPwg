import React from "react";

interface TotalPostProps {
  myTotalPosts: number;
  totalAccount: number;
  totalPosts: number;
}

const TotalPost: React.FC<TotalPostProps> = ({ myTotalPosts, totalAccount, totalPosts }) => {
  return (
    <div className="row grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="mb-5">
        <div className="p-4 bg-secondary rounded-lg">
          <div className="text-center">
            <h5 className="text-2xl my-3">Total Account</h5>
            <span className="text-2xl">{totalAccount}</span>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="p-4 bg-accent rounded-lg">
          <div className="text-center">
            <h5 className="my-3 text-2xl">Total Post</h5>
            <span className="text-2xl">{totalPosts}</span>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="p-4 bg-mint rounded-lg">
          <div className="text-center">
            <h5 className="text-2xl my-3">My Post </h5>
            <span className="text-2xl">{myTotalPosts}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TotalPost;
