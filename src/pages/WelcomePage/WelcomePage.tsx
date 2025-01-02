import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
    setGridColumns,
    setGridRows,
} from "../GamePage/components/Grid/gridSlice";
import "./welcomePage.css";
import { useEffect, useState } from "react";
import { newLevel } from "../GamePage/generation";
import { sleep } from "../../helpers";
import { setGameLoaded } from "../GamePage/gameSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

function WelcomePage() {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    const rows = useAppSelector((state) => state.grid.value.rows);
    const columns = useAppSelector((state) => state.grid.value.columns);
    const gameLoaded = useAppSelector((state) => state.game.value.loaded);

    const [pageTransition, setPageTransition] = useState(""); 

    useEffect(() => {
        if(gameLoaded) {
            dispatch(setGameLoaded(false));
            setPageTransition("fade-in");
        }
    }, [])

    return (
        <div id="welcome-screen" className={pageTransition}>
            <div>
                <h1>Colour Swap!</h1>
                <h2>Select your grid size</h2>
            </div>
            <div className="dimension-button-container">
                <div>Width</div>
                <div className="dimension-button">
                    <button
                        id="widthPlusButton"
                        className="button"
                        onClick={() => dispatch(setGridColumns(columns + 1))}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <p id="widthLabel">{columns}</p>
                    <button
                        id="widthMinusButton"
                        className="button"
                        onClick={() => dispatch(setGridColumns(columns - 1))}
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                </div>
                <div>Height</div>
                <div className="dimension-button">
                    <button
                        id="heightPlusButton"
                        className="button"
                        onClick={() => dispatch(setGridRows(rows + 1))}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <p id="heightLabel">{rows}</p>
                    <button
                        id="heightMinusButton"
                        className="button"
                        onClick={() => dispatch(setGridRows(rows - 1))}
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                </div>
            </div>
            <button className="button create-button" onClick={async () => {
                newLevel(dispatch, rows, columns, false);

                setPageTransition("fade-out");

                await sleep(500);

                navigate("game");
            }}>
                Generate grid!
            </button>
        </div>
    );
}

export default WelcomePage;
