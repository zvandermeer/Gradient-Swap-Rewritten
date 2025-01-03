import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export enum GameState {
    Playing,
    Paused,
    Won,
    Lost,
    Generating,
    Waiting,
    Home,
}

export const gameSlice = createSlice({
    name: "game",
    initialState: {
        value: {
            gameState: GameState.Home,
            statsEnabled: true,
        },
    },
    reducers: {
        setGameState: (state, action: PayloadAction<GameState>) => {
            state.value.gameState = action.payload;
        },
        setStatsEnabled: (state, action: PayloadAction<boolean>) => {
            state.value.statsEnabled = action.payload;
        }
    },
});

export const {
    setGameState,
} = gameSlice.actions;

export const selectGrid = (state: RootState) => state.grid.value;

export default gameSlice.reducer;
