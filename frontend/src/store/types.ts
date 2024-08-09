export interface Category {
    id: number;
    name: string;
  }
  
  export interface Item {
    id: number;
    name: string;
    categoryId: number;
    quantity: number;
  }
  
  export interface ShoppingState {
    items: Item[];
    categories: Category[];
    totalItems: number;
  }