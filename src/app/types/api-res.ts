import { ApiMetadata } from ".";

interface ApiResponse<T> extends ApiMetadata {
  data: T;
}

export type { ApiResponse };
