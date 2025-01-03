import { useAppDispatch, useAppSelector } from "../../../../hooks";
import "./gameHeader.css";
import { newLevel } from "../../generation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faBars } from "@fortawesome/free-solid-svg-icons";
import { GameState, setGameState } from "../../gameSlice";

interface Props {
    setOverlayVisible: (state: boolean) => void;
    overlayVisible: boolean;
    swaps: number;
    timer: number;
}

function GameHeader({
    setOverlayVisible,
    overlayVisible,
    swaps,
    timer,
}: Props) {
    const dispatch = useAppDispatch();

    const rows = useAppSelector((state) => state.grid.value.rows);
    const columns = useAppSelector((state) => state.grid.value.columns);
    const gameState = useAppSelector((state) => state.game.value.gameState);
    const statsEnabled = useAppSelector((state) => state.game.value.statsEnabled);

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
                            if (gameState === GameState.Playing ) {
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
                            newLevel(dispatch, rows, columns, 300, true);
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
