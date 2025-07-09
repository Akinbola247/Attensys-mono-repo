export interface Review {
  id?: string;
  userId: string;
  videoId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  userName?: string;
  userAvatar?: string;
}

export interface AverageRating {
  average: number;
  count: number;
}
