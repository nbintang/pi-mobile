export interface Predictions {
  id: number;
  filename: string;
  predicted_class: string;
  confidence: number;
  probabilities: {
    [className: string]: number; 
  };
  image_url: string;
  created_at: string;
}[]
