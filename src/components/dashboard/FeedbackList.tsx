
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Star, ThumbsUp, ThumbsDown } from "lucide-react";

const feedbacks = [
  {
    id: 1,
    user: "Jean Dupont",
    rating: 5,
    comment: "Excellent service, les contrats sont très professionnels !",
    date: "2025-03-10",
    helpful: 12,
    unhelpful: 1
  },
  {
    id: 2,
    user: "Marie Claire",
    rating: 4,
    comment: "Très satisfaite de la qualité des documents générés.",
    date: "2025-03-09",
    helpful: 8,
    unhelpful: 0
  }
];

const FeedbackList = () => {
  return (
    <div className="space-y-4">
      {feedbacks.map((feedback) => (
        <Card key={feedback.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {feedback.user}
              </div>
            </CardTitle>
            <div className="flex items-center gap-1">
              {Array.from({ length: feedback.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">{feedback.comment}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{feedback.date}</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{feedback.helpful}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsDown className="h-4 w-4" />
                  <span>{feedback.unhelpful}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeedbackList;
