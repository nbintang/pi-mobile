export interface ModelInfoApiResponse {
  success: boolean;
  status: string;
  message: string;
  data: {
    model_info: {
      model_version_used: number;
      output_class_names: string[];
    };
  };
  meta: {
    timestamp: string;
    api_version: string;
    requested_model_file_info: {
      filename: string;
      path: string;
      size_bytes: number;
      size_mb: number;
      last_modified: string;
      exists: boolean;
    };
    available_model_versions: number[];
    available_model_filenames: string[];
    system_info: {
      os: string;
      os_version: string;
      machine: string;
      processor: string;
      cpu_count: number;
      memory_total_mb: number;
      memory_available_mb: number;
      python_version: string;
      tensorflow_version: string;
    };
  };
}