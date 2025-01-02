import { useNavigate } from "react-router";
import { sleep } from "../../../../helpers";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { setGameFinished, setGameWon, setHeaderButtonsEnabled, setOverlayVisible, setTimerRunning } from "../../gameSlice";
import { newLevel, randomizeTiles } from "../../generation";
import {
    setGridColumns,
    setGridRows,
    setGridSwappable,
    setOriginalGridLayout,
    setTileTransition,
} from "../Grid/gridSlice";
import "./PauseOverlay.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faArrowRotateRight, faShareNodes, faEye, faHouse, faPlay } from '@fortawesome/free-solid-svg-icons'

interface Props {
    setPageTransition: (state: string) => void;
}

function PauseOverlay({setPageTransition}: Props) {
    let navigate = useNavigate();

    const dispatch = useAppDispatch();

    const overlayVisible = useAppSelector(
        (state) => state.game.value.overlayVisible
    );
    const gameFinished = useAppSelector((state) => state.game.value.finished);
    const rows = useAppSelector((state) => state.grid.value.rows);
    const columns = useAppSelector((state) => state.grid.value.columns);
    const swaps = useAppSelector((state) => state.game.value.swaps);
    const timerSeconds = useAppSelector(
        (state) => state.game.value.timerSeconds
    );
    const originalGrid = useAppSelector((state) => state.grid.value.originalLayout);
    const solvedGrid = useAppSelector((state) => state.grid.value.solvedGrid);

    return (
        <div className={"overlay " + (overlayVisible ? "" : "hidden")}>
            <div className="box">
                <h2>{gameFinished ? "You win!" : "Game Paused"}</h2>
                <div className="stats">
                    <div className="time">
                        <div>Time:</div>
                        <div id="overlayTime">
                            {Math.floor(timerSeconds / 60)}:
                            {(timerSeconds % 60).toString().padStart(2, "0")}
                        </div>
                    </div>
                    <div className="swaps">
                        <div>Swaps:</div>
                        <div id="overlaySwaps">{swaps}</div>
                    </div>
                </div>
                {gameFinished ? (
                    <>
                        <div className="final-dimension-adjust">
                            <div>
                                <p>Width</p>
                                <button
                                    id="finalWidthPlusButton"
                                    className="button"
                                    onClick={() =>
                                        dispatch(setGridColumns(columns + 1))
                                    }
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <p id="finalWidthLabel">{columns}</p>
                                <button
                                    id="finalWidthMinusButton"
                                    className="button"
                                    onClick={() =>
                                        dispatch(setGridColumns(columns - 1))
                                    }
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </div>
                            <div>
                                <p>Height</p>
                                <button
                                    id="finalHeightPlusButton"
                                    className="button"
                                    onClick={() =>
                                        dispatch(setGridRows(rows + 1))
                                    }
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <p id="finalHeightLabel">{rows}</p>
                                <button
                                    id="finalHeightMinusButton"
                                    className="button"
                                    onClick={() =>
                                        dispatch(setGridRows(rows - 1))
                                    }
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </div>
                        </div>
                        <div className="button-div">
                            <button
                                id="regenerateButton"
                                className="button"
                                onClick={async () => {
                                    dispatch(setOverlayVisible(false));
                                    let solvedGrid = await newLevel(dispatch, rows, columns, true);
                                    await sleep(1300);
                                    randomizeTiles(dispatch, solvedGrid);
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowRotateRight} /> Play
                                again!
                            </button>
                        </div>
                        <div className="button-div">
                            <button id="shareButton" className="button">
                                <FontAwesomeIcon icon={faShareNodes} />
                            </button>
                            <button id="viewButton" className="button" onClick={() => dispatch(setOverlayVisible(false))}>
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                            <button id="homeButton" className="button" onClick={async () => {
                                setPageTransition("fade-out");

                                await sleep(500);

                                navigate('/');
                            }}>
                                <FontAwesomeIcon icon={faHouse} />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="button-div">
                            <button
                                id="pauseResumeButton"
                                className="button"
                                onClick={() => {
                                    dispatch(setOverlayVisible(false));
                                }}
                            >
                                <FontAwesomeIcon icon={faPlay} size="xs"/> Back to Game
                            </button>
                        </div>
                        <div className="button-div">
                            <button id="pauseSolutionButton" className="button" onClick={async () => {
                                dispatch(setOverlayVisible(false));
                                dispatch(setTimerRunning(false));
                                dispatch(setGridSwappable(false));
                                dispatch(setGameFinished(true));
                                dispatch(setGameWon(false));
                                dispatch(setHeaderButtonsEnabled(false));

                                await sleep(600);

                                dispatch(setTileTransition("shrink"));

                                await(sleep(800));

                                dispatch(setOriginalGridLayout({rows: originalGrid.rows, columns: originalGrid.columns, tiles: solvedGrid}));

                                dispatch(setTileTransition("full"));

                                await(sleep(500));

                                dispatch(setTileTransition(""));
                                dispatch(setHeaderButtonsEnabled(true));
                            }}>
                                <FontAwesomeIcon icon={faEye} size="xs"/> Show solution
                            </button>
                        </div>
                        <div className="button-div">
                            <button id="pauseHomeButton" className="button" onClick={async () => {
                                dispatch(setOverlayVisible(false));
                                setPageTransition("fade-out");

                                await sleep(500);

                                navigate('/');
                            }}>
                                <FontAwesomeIcon icon={faHouse} size="xs"/> Go Home
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default PauseOverlay;
