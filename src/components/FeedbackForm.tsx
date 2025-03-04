
import React from "react";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface FeedbackFormProps {
  onFeedbackSubmit?: (data: { rating: number; comment: string }) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onFeedbackSubmit }) => {
  const [rating, setRating] = React.useState<string>("5");
  const [comment, setComment] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your backend
    if (onFeedbackSubmit) {
      onFeedbackSubmit({
        rating: parseInt(rating),
        comment
      });
    }
    
    toast.success("Merci pour votre retour !");
    setIsDialogOpen(false);
    setComment("");
    setRating("5");
  };
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          Donner votre avis
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Votre avis nous intéresse</DialogTitle>
          <DialogDescription>
            Merci de prendre un moment pour évaluer votre expérience avec ContratPro.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Comment évaluez-vous notre service ?</Label>
            <RadioGroup 
              value={rating} 
              onValueChange={setRating}
              className="flex space-x-4 py-2"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem value={value.toString()} id={`rating-${value}`} className="sr-only" />
                  <Label 
                    htmlFor={`rating-${value}`}
                    className={`cursor-pointer flex flex-col items-center space-y-1 ${
                      rating === value.toString() ? "text-blue-600" : ""
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                      rating === value.toString() ? "border-blue-600 bg-blue-50" : "border-gray-200"
                    }`}>
                      {value}
                    </div>
                    <span className="text-xs">
                      {value === 1 ? "Mauvais" : value === 5 ? "Excellent" : ""}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comment">Vos commentaires</Label>
            <Textarea
              id="comment"
              placeholder="Partagez votre expérience avec nous..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Envoyer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackForm;
