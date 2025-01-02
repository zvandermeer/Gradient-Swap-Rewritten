import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { clamp, sleep } from "../../../../helpers";
import { useEffect, useRef } from "react";
import { Swapy } from "swapy";
import { createSwapy } from "swapy";
import "./grid.css";
import JSConfetti from "js-confetti";
import { GameState, setGameState } from "../../gameSlice";

export type GridLayout = {
    rows: number;
    columns: number;
    tiles: Tile[];
};

export type Tile = {
    tileColor: string;
    fixed: boolean;
};

const jsConfetti = new JSConfetti();

interface Props {
    incrementSwaps: () => void;
    setOverlayVisible: (state: boolean) => void;
}

function evaluateGrid(
    solvedGridLayout: Tile[],
    internalGridLayout: String[]
): boolean {
    for (var i = 0; i < solvedGridLayout.length; i++) {
        if (
            !solvedGridLayout[i].fixed &&
            solvedGridLayout[i].tileColor !== internalGridLayout[i]
        ) {
            return false;
        }
    }

    return true;
}

function Grid({ incrementSwaps, setOverlayVisible }: Props) {
    const dispatch = useAppDispatch();

    const gameState = useAppSelector((state) => state.game.value.gameState);

    const gridTransition = useAppSelector(
        (state) => state.grid.value.gridTransition
    );
    const rows = useAppSelector((state) => state.grid.value.rows);
    const columns = useAppSelector((state) => state.grid.value.columns);
    const tileTransition = useAppSelector(
        (state) => state.grid.value.tileTransition
    );
    const originalLayout = useAppSelector(
        (state) => state.grid.value.originalLayout
    );
    const solvedGrid = useAppSelector((state) => state.grid.value.solvedGrid);

    const tileWidth = clamp((window.innerWidth - 40) / columns, 0, 100);
    const tileHeight = clamp((window.innerHeight - 120) / rows, 0, 100);

    const dotSize = (tileWidth / 10 + tileHeight / 10) / 2;

    const swapyRef = useRef<Swapy | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            swapyRef.current = createSwapy(containerRef.current, {
                swapMode: "drop",
            });
            swapyRef.current.onBeforeSwap(() => {
                // This is for dynamically enabling and disabling swapping.
                // Return true to allow swapping, and return false to prevent swapping.
                return [GameState.Playing, GameState.Waiting].includes(gameState);
            });
            swapyRef.current.onSwap(() => {
                incrementSwaps();
            });
            swapyRef.current.onSwapEnd(async () => {
                if (gameState === GameState.Waiting) {
                    dispatch(setGameState(GameState.Playing));
                }

                const slotMap = swapyRef.current?.slotItemMap().asObject;

                const internalLayout = [] as string[];

                if (slotMap) {
                    Object.keys(slotMap).map(
                        (key) => (internalLayout[parseInt(key)] = slotMap[key])
                    );
                }

                if (evaluateGrid(solvedGrid, internalLayout)) {
                    dispatch(setGameState(GameState.Won));

                    jsConfetti.addConfetti();

                    await sleep(1800);

                    setOverlayVisible(true);
                }
            });
        }
        return () => {
            swapyRef.current?.destroy();
        };
    });

    return (
        <div
            key="grid"
            id="grid"
            ref={containerRef}
            className={gridTransition}
            style={{
                display: "grid",
                gridTemplateRows: `repeat(${originalLayout.rows}, ${tileHeight}px)`,
                gridTemplateColumns: `repeat(${originalLayout.columns}, ${tileWidth}px)`,
            }}
        >
            {originalLayout.tiles.map((i, index) => {
                return (
                    <>
                        {!i.fixed ? (
                            <div
                                key={`tileDrop${index}`}
                                data-swapy-slot={index}
                            >
                                <div
                                    key={`tile${index}`}
                                    className={"tile " + tileTransition}
                                    style={{
                                        backgroundColor: i.tileColor,
                                        width: tileWidth,
                                        height: tileHeight,
                                    }}
                                    data-swapy-item={i.tileColor}
                                >
                                    {!([GameState.Playing, GameState.Waiting].includes(gameState)) && (
                                        <div
                                            key={`swapPreventionDiv${index}`}
                                            data-swapy-no-drag
                                            style={{
                                                backgroundColor: i.tileColor,
                                                width: tileWidth,
                                                height: tileHeight,
                                            }}
                                        ></div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div
                                key={`fixedTile${index}`}
                                style={{
                                    backgroundColor: i.tileColor,
                                    width: tileWidth,
                                    height: tileHeight,
                                }}
                            >
                                <div
                                    key={`dot${index}`}
                                    className="dot"
                                    style={{
                                        width: dotSize,
                                        height: dotSize,
                                        transform:
                                            "translate(" +
                                            (tileWidth - dotSize) / 2 +
                                            "px," +
                                            (tileHeight - dotSize) / 2 +
                                            "px)",
                                    }}
                                ></div>
                            </div>
                        )}
                    </>
                );
            })}
        </div>
    );
}

export default Grid;
