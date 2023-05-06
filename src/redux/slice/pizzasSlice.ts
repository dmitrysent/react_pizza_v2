import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {Sort} from "./filterSlice";


export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

type Pizza = {
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

interface PizzaSliceState {
    items: Pizza[];
    status: Status
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
    const {
        order,
        sortBy,
        category,
        search,
        currentPage
    } = params
    const {data} = await axios.get<Pizza[]>(`https://629b6df0656cea05fc391ca2.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)

    return data
})

export const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {

        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
                state.items = action.payload
                state.status = Status.SUCCESS
            })

            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR
                state.items = []
            })
    }
})

export const selectPizzaData = (state: RootState) => state.pizza

export const selectFilter = (state: RootState) => state.filter

export const {setItems} = pizzasSlice.actions

export default pizzasSlice.reducer