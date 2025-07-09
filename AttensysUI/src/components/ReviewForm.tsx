import { useState } from "react";
import { Review } from "@/types/review";
import { RatingDisplay } from "./RatingDisplay";
import { signInUser } from "@/lib/services/authService";
import { auth } from "@/lib/firebase/client";

interface ReviewFormProps {
  videoId: string;
  userId: string;
  onSubmit: (
    review: Omit<Review, "id" | "createdAt" | "userId" | "videoId">,
  ) => Promise<void>;
}

export const ReviewForm = ({ videoId, userId, onSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      setError("Please select a rating");
      return;
    }
    if (!auth.currentUser) {
      await signInUser();
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({ rating, comment });
      setRating(null);
      setComment("");
    } catch (err) {
      setError("Failed to submit review. Please try again.");
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6  shadow-md">
      {/* <h3 className="text-xl font-semibold mb-4">Leave a Review</h3> */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4 items-center">
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Tap to rate:{" "}
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`text-3xl ${rating && star <= rating ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-500 focus:outline-none`}
                onClick={() => setRating(star)}
                aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-bold text-gray-700 mb-1"
          >
            Comment
          </label>
          <textarea
            id="comment"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this video..."
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting || !rating}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting || !rating ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};
