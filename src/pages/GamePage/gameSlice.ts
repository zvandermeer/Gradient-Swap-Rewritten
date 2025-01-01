import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export const gameSlice = createSlice({
    name: "game",
    initialState: {
        value: {
            swaps: 0,
            timerSeconds: 0,
            timerRunning: false,
            statsEnabled: true,
            finished: false,
            won: false,
            overlayVisible: false,
            loaded: false,
            headerButtonsEnabled: true,
        },
    },
    reducers: {
        setGameSwaps: (state, action: PayloadAction<number>) => {
            state.value.swaps = action.payload;
        },
        incrementGameSwaps: (state) => {
            state.value.swaps += 1;
        },
        setTimer: (state, action: PayloadAction<number>) => {
            state.value.timerSeconds = action.payload;
        },
        incrementTimer: (state) => {
            state.value.timerSeconds += 1;
        },
        setTimerRunning: (state, action: PayloadAction<boolean>) => {
            state.value.timerRunning = action.payload;
        },
        setGameStatsEnabled: (state, action: PayloadAction<boolean>) => {
            state.value.statsEnabled = action.payload;
        },
        setGameFinished: (state, action: PayloadAction<boolean>) => {
            state.value.finished = action.payload;
        },
        setGameWon: (state, action: PayloadAction<boolean>) => {
            state.value.won = action.payload;
        },
        setOverlayVisible: (state, action: PayloadAction<boolean>) => {
            state.value.overlayVisible = action.payload;
        },
        setGameLoaded: (state, action: PayloadAction<boolean>) => {
            state.value.loaded = action.payload;
        },
        setHeaderButtonsEnabled: (state, action: PayloadAction<boolean>) => {
            state.value.headerButtonsEnabled = action.payload;
        }
    },
});

export const {
    setGameSwaps,
    incrementGameSwaps,
    setTimer,
    incrementTimer,
    setTimerRunning,
    setGameStatsEnabled,
    setGameFinished,
    setGameWon,
    setOverlayVisible,
    setGameLoaded,
    setHeaderButtonsEnabled,
} = gameSlice.actions;

export const selectGrid = (state: RootState) => state.grid.value;

export default gameSlice.reducer;
