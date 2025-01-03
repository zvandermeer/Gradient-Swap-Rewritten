import { useAppDispatch, useAppSelector } from "../../../../hooks";
import "./gameHeader.css";
import { newLevel } from "../../generation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faBars } from "@fortawesome/free-solid-svg-icons";
import { GameState, incrementTimer, setGameState } from "../../gameSlice";
import { useEffect } from "react";

interface Props {
    setGridLoaded: (state: boolean) => void;
    setOverlayVisible: (state: boolean) => void;
    overlayVisible: boolean;
}

function GameHeader({
    setGridLoaded,
    setOverlayVisible,
    overlayVisible,
}: Props) {
    const dispatch = useAppDispatch();

    const rows = useAppSelector((state) => state.grid.value.rows);
    const columns = useAppSelector((state) => state.grid.value.columns);
    const gameState = useAppSelector((state) => state.game.value.gameState);
    const statsEnabled = useAppSelector(
        (state) => state.game.value.statsEnabled
    );
    const swaps = useAppSelector((state) => state.game.value.swaps);
    const timer = useAppSelector((state) => state.game.value.timer);

    useEffect(() => {
        const x = setInterval(function () {
            if (gameState === GameState.Playing) {
                dispatch(incrementTimer());
            }
        }, 1000);

        return () => {
            clearInterval(x);
        };
    }, [gameState]);

    return (
        <div id="controls">
            <div id="header-buttons">
                <button
                    id="header-menu"
                    className="button"
                    onClick={() => {
                        if (
                            !overlayVisible &&
                            gameState !== GameState.Generating
                        ) {
                            if (gameState === GameState.Playing) {
                                dispatch(setGameState(GameState.Paused));
                            }
                            setOverlayVisible(true);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <button
                    onClick={async () => {
                        if (
                            !overlayVisible &&
                            gameState !== GameState.Generating
                        ) {
                            newLevel(
                                dispatch,
                                rows,
                                columns,
                                300,
                                true,
                                setGridLoaded
                            );
                        }
                    }}
                    id="header-restart"
                    className="button"
                >
                    <FontAwesomeIcon icon={faArrowRotateRight} />
                </button>
            </div>
            {statsEnabled && (
                <div id="header-stats">
                    <div>
                        <span id="swaps">Swaps: {swaps}</span>
                        <span id="timer">
                            {Math.floor(timer / 60)}:
                            {(timer % 60).toString().padStart(2, "0")}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GameHeader;
