export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type Pizza = {
    title: string,
    imageUrl: string,
    sizes: number[],
    price: number,
    types: number[]
}

export type SearchPizzaParams = {
    order: string;
    sortBy: string;
    category: string;
    search: string;
    currentPage: string;
}

export interface PizzaSliceState {
    items: Pizza[];
    status: Status
}