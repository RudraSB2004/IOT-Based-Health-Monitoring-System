import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <div
      className="
    glass
    p-6
    rounded-3xl
    "
    >
      <Skeleton height={40} />

      <Skeleton height={80} className="mt-4" />
    </div>
  );
};

export default CardSkeleton;
