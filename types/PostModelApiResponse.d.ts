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
    segar: number;
    bukan_daging: number;
    busuk: number;
  };
  overall_prediction: {
    class: string;
    confidence_percentage: string;
    confidence_raw_value: number;
  };
  class_probabilities: {
    segar: {
      percentage: string;
      raw_value: number;
    };
    bukan_daging: {
      percentage: string;
      raw_value: number;
    };
    busuk: {
      percentage: string;
      raw_value: number;
    };
  };
  uploaded_image_url: string;
  processing_time_ms: number;
}
