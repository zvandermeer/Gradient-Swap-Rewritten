import Grid from "./components/Grid/Grid";
import GameHeader from "./components/GameHeader/GameHeader";
import "./gamePage.css";
import { useEffect, useState } from "react";
import { sleep } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router";
import PauseOverlay from "./components/PauseOverlay/PauseOverlay";
import { GameState, setGameState } from "./gameSlice";
import {
    setOriginalGridLayout,
    setTileTransition,
} from "./components/Grid/gridSlice";

async function solveGame(solveDelay: number) {
    const dispatch = useAppDispatch();

    const originalGrid = useAppSelector(
        (state) => state.grid.value.originalLayout
    );
    const solvedGrid = useAppSelector((state) => state.grid.value.solvedGrid);

    await sleep(solveDelay);

    dispatch(setTileTransition("shrink"));

    await sleep(800);

    dispatch(
        setOriginalGridLayout({
            rows: originalGrid.rows,
            columns: originalGrid.columns,
            tiles: solvedGrid,
        })
    );

    dispatch(setTileTransition("full"));

    await sleep(500);

    dispatch(setTileTransition(""));
    dispatch(setGameState(GameState.Lost));
}

function GamePage() {
    let navigate = useNavigate();

    const originalGrid = useAppSelector(
        (state) => state.grid.value.originalLayout
    );
    const gameState = useAppSelector((state) => state.game.value.gameState);

    const [pageTransition, setPageTransition] = useState("fade-in");
    const [swaps, setSwaps] = useState(0);
    const [timer, setTimer] = useState(0);
    const [overlayVisible, setOverlayVisible] = useState(false);

    useEffect(() => {
        const timerFunc = setInterval(function () {
            if (gameState === GameState.Playing) {
                setTimer(timer + 1);
            }
        }, 1000);

        return () => {
            clearInterval(timerFunc);
        };
    });

    useEffect(() => {
        const run = async () => {
            if (Object.keys(originalGrid).length === 0) {
                navigate("/");
            } else {
                if (pageTransition === "fade-in") {
                    await sleep(500);
                    setPageTransition("");
                }
            }
        };
        run();
    }, [])

    return (
        <>
            {Object.keys(originalGrid).length !== 0 && (
                <>
                    <div id="game-screen" className={pageTransition}>
                        <GameHeader
                            setOverlayVisible={setOverlayVisible}
                            overlayVisible={overlayVisible}
                            swaps={swaps}
                            timer={timer}
                        />
                        <Grid
                            incrementSwaps={() => {
                                setSwaps(swaps + 1);
                            }}
                            setOverlayVisible={setOverlayVisible}
                        />
                    </div>
                    {overlayVisible && (
                        <PauseOverlay
                            setPageTransition={setPageTransition}
                            setOverlayVisible={setOverlayVisible}
                            solveGame={solveGame}
                            timer={timer}
                            swaps={swaps}
                        />
                    )}
                </>
            )}
        </>
    );
}

export default GamePage;
