export interface Substop {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface City {
  id: string;
  name: string;
  url: string;
  type: string;
  substops: Substop[];
}
