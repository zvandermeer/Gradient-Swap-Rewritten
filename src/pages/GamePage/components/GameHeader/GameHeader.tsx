import { useAppDispatch, useAppSelector } from "../../../../hooks";
import "./gameHeader.css";
import { newLevel, randomizeTiles } from "../../generation";
import { setOverlayVisible } from "../../gameSlice";
import { sleep } from "../../../../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faBars } from "@fortawesome/free-solid-svg-icons";

function GameHeader() {
    const dispatch = useAppDispatch();

    const rows = useAppSelector((state) => state.grid.value.rows);
    const columns = useAppSelector((state) => state.grid.value.columns);
    const swaps = useAppSelector((state) => state.game.value.swaps);
    const timerSeconds = useAppSelector(
        (state) => state.game.value.timerSeconds
    );
    const headerButtonsEnabled = useAppSelector(
        (state) => state.game.value.headerButtonsEnabled
    );

    return (
        <div id="controls">
            <div id="header-buttons">
                <button
                    id="header-menu"
                    className="button"
                    onClick={() => {
                        dispatch(setOverlayVisible(true));
                    }}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <button
                    onClick={async () => {
                        if (headerButtonsEnabled) {
                            let solvedGrid = await newLevel(
                                dispatch,
                                rows,
                                columns,
                                true
                            );
                            await sleep(1300);
                            randomizeTiles(dispatch, solvedGrid);
                        }
                    }}
                    id="header-restart"
                    className="button"
                >
                    <FontAwesomeIcon icon={faArrowRotateRight} />
                </button>
            </div>
            <div id="header-stats">
                <div>
                    <span id="swaps">Swaps: {swaps}</span>
                    <span id="timer">
                        {Math.floor(timerSeconds / 60)}:
                        {(timerSeconds % 60).toString().padStart(2, "0")}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default GameHeader;
