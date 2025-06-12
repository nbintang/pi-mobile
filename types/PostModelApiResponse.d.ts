export interface PostModelApiResponse {
  success: boolean
  status: string
  message: string
  data: Data
  meta: Meta
}

export interface Data {
  filename: string
  file_content_type: string
  input_image_info: InputImageInfo
  model_info: ModelInfo
  raw_model_output: number[]
  raw_probabilities_by_class_name: RawProbabilitiesByClassName
  overall_prediction: OverallPrediction
  class_probabilities: ClassProbabilities
}

export interface InputImageInfo {
  original_dimensions: OriginalDimensions
  processed_dimensions_for_model: ProcessedDimensionsForModel
  target_image_size_for_model: number[]
}

export interface OriginalDimensions {
  width: number
  height: number
}

export interface ProcessedDimensionsForModel {
  height: number
  width: number
  channels: number
}

export interface ModelInfo {
  model_version_used: number
  output_class_names: string[]
  prediction_type: string
}

export interface RawProbabilitiesByClassName {
  Segar: number
  Busuk: number
}

export interface OverallPrediction {
  class: string
  confidence_percentage: string
  confidence_raw_value: number
}

export interface ClassProbabilities {
  Segar: Segar
  Busuk: Busuk
}

export interface Segar {
  percentage: string
  raw_value: number
}

export interface Busuk {
  percentage: string
  raw_value: number
}

export interface Meta {
  processing_time_ms: number
  api_version: string
  timestamp: string
  requested_model_file_info: RequestedModelFileInfo
  available_model_versions: number[]
  available_model_filenames: string[]
  system_info: SystemInfo
}

export interface RequestedModelFileInfo {
  filename: string
  path: string
  size_bytes: number
  size_mb: number
  last_modified: string
  exists: boolean
}

export interface SystemInfo {
  os: string
  os_version: string
  cpu_count: number
  python_version: string
  tensorflow_version: string
  memory_total_mb: number
  memory_available_mb: number
}
