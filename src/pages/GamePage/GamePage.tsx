import Grid from "./components/Grid/Grid";
import GameHeader from "./components/GameHeader/GameHeader";
import "./gamePage.css";
import { useEffect, useState } from "react";
import { sleep } from "../../helpers";
import { randomizeTiles } from "./generation";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router";
import PauseOverlay from "./components/PauseOverlay/PauseOverlay";
import { setGameLoaded } from "./gameSlice";

function GamePage() {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    const originalGrid = useAppSelector(
        (state) => state.grid.value.originalLayout
    );
    const gameLoaded = useAppSelector((state) => state.game.value.loaded);

    const [pageTransition, setPageTransition] = useState("fade-in");

    useEffect(() => {
        const run = async () => {
            if (Object.keys(originalGrid).length === 0) {
                navigate("/");
            } else {
                if (!gameLoaded) {
                    dispatch(setGameLoaded(true));
                    await sleep(500);
                    setPageTransition("");

                    randomizeTiles(dispatch, originalGrid);
                }
            }
        };
        run();
    }, []);

    return (
        <>
            {Object.keys(originalGrid).length !== 0 && (
                <>
                    <div id="game-screen" className={pageTransition}>
                        <GameHeader />
                        <Grid />
                    </div>
                    <PauseOverlay setPageTransition={(state: string) => {setPageTransition(state)}} />
                </>
            )}
        </>
    );
}

export default GamePage;
