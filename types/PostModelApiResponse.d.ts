export interface PostPredictions {
  filename: string;
  file_content_type: string;
  input_image_info: {
    original_dimensions: {
      width: number;
      height: number;
    };
    processed_dimensions_for_model: {
      height: number;
      width: number;
      channels: number;
    };
    target_image_size_for_model: [number, number];
  };
  model_info: {
    output_class_names: string[];
    prediction_type: string;
  };
  raw_model_output: number[];
  raw_probabilities_by_class_name: {
    [className: string]: number; 
  };
  overall_prediction: {
    class: "FRESH" | "NOT_FRESH" | "NOT_MEAT";
    confidence_percentage: string;
    confidence_raw_value: number;
  };
  uploaded_image_url: string;
  processing_time_ms: number;
}