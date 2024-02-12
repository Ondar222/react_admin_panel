interface ICRUDStore<T> {
  create: (model: T) => void;
  update: (model: T) => void;
  delete: (id: string | number) => void;

  findAll: () => void;
  findById: (id: string | number) => void;
}

export type { ICRUDStore };
