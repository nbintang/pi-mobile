export interface Predictions {
  id: number;
  filename: string;
  predicted_class: string;
  confidence: number;
  probabilities: {
    busuk: number;
    segar: number;
    bukan_daging: number;
  };
  image_url: string;
  created_at: string;
}[]
