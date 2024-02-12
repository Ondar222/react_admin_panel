interface ApiMetadata {
  meta?: {
    page: number;
    page_count: number;
    limit: number;
    total: number;
  };
}

export type { ApiMetadata };
