import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {Pizza, PizzaSliceState, SearchPizzaParams, Status} from "./types";





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


export const {setItems} = pizzasSlice.actions

export default pizzasSlice.reducer