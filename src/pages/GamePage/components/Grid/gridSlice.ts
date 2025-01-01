import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../../store";
import type { GridLayout, Tile } from "./Grid";

export const gridSlice = createSlice({
    name: "grid",
    initialState: {
        value: {
            gridTransition: "",
            rows: 5,
            columns: 5,
            tileTransition: "",
            originalLayout: {} as GridLayout,
            solvedGrid: [] as Tile[],
            swappable: false,
        },
    },
    reducers: {
        setGridTransition: (state, action: PayloadAction<string>) => {
            state.value.gridTransition = action.payload;
        },
        setGridRows: (state, action: PayloadAction<number>) => {
            if(action.payload >= 3) {
                state.value.rows = action.payload;
            }
        },
        setGridColumns: (state, action: PayloadAction<number>) => {
            if(action.payload >= 3) {
                state.value.columns = action.payload;
            }
        },
        setTileTransition: (state, action: PayloadAction<string>) => {
            state.value.tileTransition = action.payload;
        },
        setOriginalGridLayout: (state, action: PayloadAction<GridLayout>) => {
            state.value.originalLayout = action.payload;
        },
        setSolvedGridLayout: (state, action: PayloadAction<Tile[]>) => {
            state.value.solvedGrid = action.payload;
        },
        setGridSwappable: (state, action: PayloadAction<boolean>) => {
            state.value.swappable = action.payload;
        },
    },
});

export const {
    setGridTransition,
    setGridRows,
    setGridColumns,
    setTileTransition,
    setOriginalGridLayout,
    setSolvedGridLayout,
    setGridSwappable,
} = gridSlice.actions;

export const selectGrid = (state: RootState) => state.grid.value;

export default gridSlice.reducer;
