declare type Nullable<T> = T | null

declare type MergeIntersection<A> = A extends infer T
  ? { [K in keyof T]: T[K] }
  : never

declare type ValueOf<T> = T[keyof T]
