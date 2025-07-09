import { Review } from "@/types/review";
import { RatingDisplay } from "./RatingDisplay";

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
  if (reviews?.length == 0 || !reviews) {
    return (
      <div className="bg-white p-6 rounded-lg text-center text-gray-500 h-[300px] flex items-center justify-center">
        No reviews yet. Be the first to review!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* <h3 className="text-xl font-semibold">Reviews ({reviews?.length})</h3> */}
      <div className="space-y-4">
        {reviews?.map((review) => (
          <div
            key={review.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
                  {review.userName?.charAt(0) || "U"}
                </div>
                <span className="font-medium">
                  {review.userName || "Anonymous"}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="mb-2">
              <RatingDisplay
                rating={{ average: review.rating, count: 1 }}
                size="sm"
              />
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
