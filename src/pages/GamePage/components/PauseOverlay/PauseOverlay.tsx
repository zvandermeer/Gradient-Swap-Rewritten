import { useNavigate } from "react-router";
import { sleep } from "../../../../helpers";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { newLevel } from "../../generation";
import { setGridColumns, setGridRows } from "../Grid/gridSlice";
import "./PauseOverlay.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faMinus,
    faArrowRotateRight,
    faShareNodes,
    faHouse,
    faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { GameState } from "../../gameSlice";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";

interface Props {
    setPageTransition: (state: string) => void;
    setOverlayVisible: (state: boolean) => void;
    solveGame: (solveDelay: number) => void;
    timer: number;
    swaps: number;
}

async function closeOverlay(
    setOverlayHiding: (state: boolean) => void,
    setOverlayVisible: (state: boolean) => void
) {
    setOverlayHiding(true);

    await sleep(500);

    setOverlayVisible(false);
}

function PauseOverlay({
    setPageTransition,
    setOverlayVisible,
    solveGame,
    timer,
    swaps,
}: Props) {
    let navigate = useNavigate();

    const dispatch = useAppDispatch();

    const rows = useAppSelector((state) => state.grid.value.rows);
    const columns = useAppSelector((state) => state.grid.value.columns);
    const gameState = useAppSelector((state) => state.game.value.gameState, () => true);
    const statsEnabled = useAppSelector((state) => state.game.value.statsEnabled);

    const [overlayHiding, setOverlayHiding] = useState(false);
    const [overlayHeader, setOverlayHeader] = useState("");

    useEffect(() => {
        switch (gameState) {
            case GameState.Won: {
                setOverlayHeader("You win!");
                break;
            }
            case GameState.Lost: {
                setOverlayHeader("Play again?");
                break;
            }
            case GameState.Waiting:
            case GameState.Paused: {
                setOverlayHeader("Game paused");
                break;
            }
            default: {
                setOverlayHeader("Unknown game state");
                break;
            }
        }
    });

    return (
        <div className={"overlay " + (overlayHiding ? "hide" : "")}>
            <div className="box">
                <h2>{overlayHeader}</h2>
                {statsEnabled && (
                    <div className="stats">
                        <div className="time">
                            <div>Time:</div>
                            <div id="overlayTime">
                                {Math.floor(timer / 60)}:
                                {(timer % 60).toString().padStart(2, "0")}
                            </div>
                        </div>
                        <div className="swaps">
                            <div>Swaps:</div>
                            <div id="overlaySwaps">{swaps}</div>
                        </div>
                    </div>
                )}
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
                            onClick={() => dispatch(setGridRows(rows + 1))}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <p id="finalHeightLabel">{rows}</p>
                        <button
                            id="finalHeightMinusButton"
                            className="button"
                            onClick={() => dispatch(setGridRows(rows - 1))}
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
                            newLevel(dispatch, rows, columns, 300, true);

                            closeOverlay(setOverlayHiding, setOverlayVisible);
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowRotateRight} size="xs" />{" "}
                        New Game!
                    </button>
                </div>
                {[GameState.Paused, GameState.Waiting].includes(gameState) && (
                    <div className="button-div">
                        <button
                            id="pauseSolutionButton"
                            className="button"
                            onClick={() => {
                                solveGame(600);
                                closeOverlay(
                                    setOverlayHiding,
                                    setOverlayVisible
                                );
                            }}
                        >
                            <FontAwesomeIcon icon={faLightbulb} size="xs" />{" "}
                            Show solution
                        </button>
                    </div>
                )}
                {gameState === GameState.Won && (
                    <div className="button-div">
                        <button id="shareButton" className="button">
                            <FontAwesomeIcon icon={faShareNodes} /> Share!
                        </button>
                    </div>
                )}
                <div className="button-div">
                    <button
                        id="viewButton"
                        className="button"
                        onClick={() =>
                            closeOverlay(setOverlayHiding, setOverlayVisible)
                        }
                    >
                        <FontAwesomeIcon icon={faRectangleXmark} size="lg" />
                    </button>
                    <button
                        id="homeButton"
                        className="button"
                        onClick={async () => {
                            closeOverlay(setOverlayHiding, setOverlayVisible);
                            setPageTransition("fade-out");

                            await sleep(500);

                            navigate("/");
                        }}
                    >
                        <FontAwesomeIcon icon={faHouse} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PauseOverlay;
