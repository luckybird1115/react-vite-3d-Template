
import { CELLSIZE, BALKSIZE, OFFSET, LODGESIZE, LODGEDELTAHEIGHT } from "./constants";

/**
 * Calculates the number of rows and cell depth of the grid.
 * @param {number} depth The depth of the grid.
 * @returns {Object} An object with two properties: numRows and cellDepth.
 */
export function getRows(depth) {
    // The maximum depth of a cell in the grid.
    const maxDepth = CELLSIZE.max;;

    // Calculate the number of rows needed to fit the depth of the grid.
    const numRows = (Math.floor((depth - BALKSIZE.depth) / maxDepth) + 1);

    // Calculate the depth of each cell in the grid.
    const cellDepth = (depth - BALKSIZE.depth) / numRows;

    return {
        numRows, cellDepth
    }

}


/**
 * Calculates the number of columns and the width of each cell in the grid.
 * @param {number} width The width of the grid.
 * @returns {Object} An object with two properties: numCols and cellWidth.
 */
export function getColumns(width) {
    /**
     * The maximum width of a cell in the grid.
     */
    const maxWidth = CELLSIZE.max;

    /**
     * Calculate the number of columns needed to fit the width of the grid.
     */
    const numCols = (Math.floor((width - BALKSIZE.width) / maxWidth) + 1);

    /**
     * Calculate the width of each cell in the grid.
     */
    const cellWidth = (width - BALKSIZE.width) / numCols;

    return {
        numCols, cellWidth
    }
}

export function getBalks(width, depth) {
    const vBalks = [];
    const corners = [];
    const hbalks = [];

    const { numRows, cellDepth } = getRows(depth);
    const { numCols, cellWidth } = getColumns(width);

    const startX = -width / 2 + BALKSIZE.width / 2;
    const startZ = -depth / 2 + BALKSIZE.depth / 2;

    for (let i = 0; i < numRows + 1; i++) {
        for (let j = 0; j < numCols + 1; j++) {
            if (i === 0 || i === numRows) {
                vBalks.push({
                    row: i,
                    col: j,
                    pos: {
                        x: startX + j * cellWidth,
                        y: 0,
                        z: startZ + i * cellDepth
                    }
                })
                if (i === 0 && (j === 0 || j === numCols)) {
                    corners.push({
                        row: i,
                        col: j,
                        pos: {
                            x: startX + j * cellWidth,
                            y: 0,
                            z: startZ + i * cellDepth + BALKSIZE.depth / 2
                        },
                        rotation: {
                            x: 0,
                            y: -Math.PI / 2,
                            z: 0
                        }
                    })
                }
                if (i === numRows && (j === 0 || j === numCols)) {
                    corners.push({
                        row: i,
                        col: j,
                        pos: {
                            x: startX + j * cellWidth,
                            y: 0,
                            z: startZ + i * cellDepth - BALKSIZE.depth / 2
                        },
                        rotation: {
                            x: 0,
                            y: Math.PI / 2,
                            z: 0
                        }
                    })
                }
                if (j === 0) {
                    corners.push({
                        row: i,
                        col: j,
                        pos: {
                            x: startX + j * cellWidth + BALKSIZE.width / 2,
                            y: 0,
                            z: startZ + i * cellDepth
                        },
                        rotation: {
                            x: 0,
                            y: 0,
                            z: 0
                        }
                    })

                } else if (j === numCols) {
                    corners.push({
                        row: i,
                        col: j,
                        pos: {
                            x: startX + j * cellWidth - BALKSIZE.width / 2,
                            y: 0,
                            z: startZ + i * cellDepth
                        },
                        rotation: {
                            x: 0,
                            y: Math.PI,
                            z: 0
                        }
                    })
                } else {
                    corners.push({
                        row: i,
                        col: j,
                        pos: {
                            x: startX + j * cellWidth + BALKSIZE.width / 2,
                            y: 0,
                            z: startZ + i * cellDepth
                        },
                        rotation: {
                            x: 0,
                            y: 0,
                            z: 0
                        }
                    })
                    corners.push({
                        row: i,
                        col: j,
                        pos: {
                            x: startX + j * cellWidth - BALKSIZE.width / 2,
                            y: 0,
                            z: startZ + i * cellDepth
                        },
                        rotation: {
                            x: 0,
                            y: Math.PI,
                            z: 0
                        }
                    })
                }

            } else {
                if (j === 0 || j === numCols) {
                    vBalks.push({
                        row: i,
                        col: j,
                        pos: {
                            x: startX + j * cellWidth,
                            y: 0,
                            z: startZ + i * cellDepth
                        }
                    })

                    corners.push({
                        row: i,
                        col: j,
                        pos: {
                            x: startX + j * cellWidth,
                            y: 0,
                            z: startZ + i * cellDepth - BALKSIZE.depth / 2
                        },
                        rotation: {
                            x: 0,
                            y: Math.PI / 2,
                            z: 0
                        }
                    })
                    corners.push({
                        row: i,
                        col: j,
                        pos: {
                            x: startX + j * cellWidth,
                            y: 0,
                            z: startZ + i * cellDepth + BALKSIZE.depth / 2
                        },
                        rotation: {
                            x: 0,
                            y: 3 * Math.PI / 2,
                            z: 0
                        }
                    })
                }
            }
        }
    }

    hbalks.push({
        pos: {
            x: startX,
            y: BALKSIZE.height,
            z: -depth / 2
        },
        rotation: {
            x: 0,
            y: -Math.PI / 2,
            z: 0
        },
        scale: depth,
    })

    hbalks.push({
        pos: {
            x: width / 2 - BALKSIZE.width / 2,
            y: BALKSIZE.height,
            z: -depth / 2
        },
        rotation: {
            x: 0,
            y: -Math.PI / 2,
            z: 0
        },
        scale: depth,
    })

    hbalks.push({
        pos: {
            x: startX + BALKSIZE.width / 2,
            y: BALKSIZE.height,
            z: startZ
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: width - 2 * BALKSIZE.width
    })
    hbalks.push({
        pos: {
            x: startX + BALKSIZE.width / 2,
            y: BALKSIZE.height,
            z: depth / 2 - BALKSIZE.depth / 2,
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: width - 2 * BALKSIZE.width
    })

    return { vBalks, corners, hbalks }
}

export function getHLodge(width, depth) {
    const hLodges = [];
    const lodgeboards = [];
    const ruberoids = [];
    const profiles = [];

    const numBoards = Math.floor((width + 2 * OFFSET) / 0.19);
    const boardGap = (width + 2 * OFFSET) / numBoards;

    ruberoids.push({
        pos: {
            x: -width / 2 - OFFSET,
            y: BALKSIZE.height + 2 * LODGEDELTAHEIGHT + LODGESIZE.depth - 0.002,
            z: depth / 2 + OFFSET,
        },
        scale: {
            x: width + 2 * OFFSET,
            y: 1,
            z: depth + 2 * OFFSET
        }
    })

    profiles.push({
        pos: {
            x: -width / 2 - OFFSET - LODGESIZE.width - 0.034,
            y: BALKSIZE.height + 2 * LODGEDELTAHEIGHT + LODGESIZE.depth,
            z: -depth / 2 - OFFSET
        },
        rotation: {
            x: 0,
            y: -Math.PI / 2,
            z: 0
        },
        scale: depth + 2 * OFFSET,
    })

    hLodges.push({
        pos: {
            x: -width / 2 - OFFSET,
            y: BALKSIZE.height + LODGEDELTAHEIGHT,
            z: depth / 2 + OFFSET,
        },
        rotation: {
            x: 0,
            y: Math.PI / 2,
            z: 0
        },
        scale: depth + 2 * OFFSET,
    })

    hLodges.push({
        pos: {
            x: -width / 2 - OFFSET - LODGESIZE.width,
            y: BALKSIZE.height + 2 * LODGEDELTAHEIGHT,
            z: depth / 2 + OFFSET + LODGESIZE.width,
        },
        rotation: {
            x: 0,
            y: Math.PI / 2,
            z: 0
        },
        scale: depth + 2 * OFFSET + 2 * LODGESIZE.width,
    })

    hLodges.push({
        pos: {
            x: width / 2 + OFFSET - LODGESIZE.width,
            y: BALKSIZE.height + LODGEDELTAHEIGHT,
            z: depth / 2 + OFFSET,
        },
        rotation: {
            x: 0,
            y: Math.PI / 2,
            z: 0
        },
        scale: depth + 2 * OFFSET,
    })

    hLodges.push({
        pos: {
            x: width / 2 + OFFSET,
            y: BALKSIZE.height + 2 * LODGEDELTAHEIGHT,
            z: depth / 2 + OFFSET + LODGESIZE.width,
        },
        rotation: {
            x: 0,
            y: Math.PI / 2,
            z: 0
        },
        scale: depth + 2 * OFFSET + 2 * LODGESIZE.width,
    })



    hLodges.push({
        pos: {
            x: -width / 2 - OFFSET + LODGESIZE.width,
            y: BALKSIZE.height + LODGEDELTAHEIGHT,
            z: depth / 2 + OFFSET - LODGESIZE.width,
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: width + 2 * (OFFSET - LODGESIZE.width),
    })
    hLodges.push({
        pos: {
            x: -width / 2 - OFFSET,
            y: BALKSIZE.height + 2 * LODGEDELTAHEIGHT,
            z: depth / 2 + OFFSET,
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: width + 2 * OFFSET,
    })
    hLodges.push({
        pos: {
            x: -width / 2 - OFFSET + LODGESIZE.width,
            y: BALKSIZE.height + LODGEDELTAHEIGHT,
            z: -depth / 2 - OFFSET,
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: width + 2 * (OFFSET - LODGESIZE.width),
    })

    hLodges.push({
        pos: {
            x: -width / 2 - OFFSET,
            y: BALKSIZE.height + 2 * LODGEDELTAHEIGHT,
            z: -depth / 2 - OFFSET - LODGESIZE.width,
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: width + 2 * OFFSET
    })



    for (let i = 0; i < numBoards; i++) {
        lodgeboards.push({
            pos: {
                x: -width / 2 - OFFSET + 0.095 + i * boardGap,
                y: BALKSIZE.height + 2 * BALKSIZE.width,
                z: depth / 2 + OFFSET,
            },
            scale: {
                x: 1,
                y: 1,
                z: depth + 2 * OFFSET
            }
        })
    }

    return { hLodges, lodgeboards, ruberoids, profiles }
}

export function getBeam(width, depth) {
    const lbeams = [];
    const sbeams = [];

    const startZ = depth / 2 - 0.025;
    const startX = -width / 2 - OFFSET + LODGESIZE.width + 0.2;

    const numbeams = Math.floor(((width + 2 * (OFFSET - LODGESIZE.width - 0.2) - 0.05)) / 0.55) + 1;
    const gap = ((width + 2 * (OFFSET - LODGESIZE.width - 0.2) - 0.05)) / numbeams;

    const numSbeams = Math.floor((depth - 0.05) / (0.6 + 0.05)) + 1;
    const sBeamGap = (depth - 0.05) / numSbeams;

    lbeams.push({
        pos: {
            x: -width / 2 - OFFSET + LODGESIZE.width,
            y: BALKSIZE.height + BALKSIZE.width,
            z: -depth / 2 - 0.025,
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: width + 2 * (OFFSET - LODGESIZE.width)
    })

    lbeams.push({
        pos: {
            x: -width / 2 - OFFSET + LODGESIZE.width,
            y: BALKSIZE.height + BALKSIZE.width,
            z: depth / 2 - 0.025,
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: width + 2 * (OFFSET - LODGESIZE.width)
    })

    for (let i = 0; i < numSbeams - 1; i++) {
        sbeams.push({
            pos: {
                x: -width / 2 - OFFSET + LODGESIZE.width,
                y: BALKSIZE.height + BALKSIZE.width,
                z: -depth / 2 + 0.025 + (i + 1) * sBeamGap,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            scale: 1,
        })
        sbeams.push({
            pos: {
                x: width / 2 + OFFSET - LODGESIZE.width - 0.2,
                y: BALKSIZE.height + BALKSIZE.width,
                z: -depth / 2 + 0.025 + (i + 1) * sBeamGap,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            scale: 1,
        })
    }

    for (let i = 0; i < numbeams + 1; i++) {
        lbeams.push({
            pos: {
                x: startX + gap * i,
                y: BALKSIZE.height + BALKSIZE.width,
                z: startZ
            },
            rotation: {
                x: 0,
                y: Math.PI / 2,
                z: 0
            },
            scale: depth - 0.05,
        })

        sbeams.push({
            pos: {
                x: startX + gap * i + 0.025,
                y: BALKSIZE.height + BALKSIZE.width,
                z: -depth / 2 - 0.025,
            },
            rotation: {
                x: 0,
                y: Math.PI / 2,
                z: 0
            },
            scale: (OFFSET - LODGESIZE.width - 0.025) / 0.2,
        })

        sbeams.push({
            pos: {
                x: startX + gap * i + 0.025,
                y: BALKSIZE.height + BALKSIZE.width,
                z: depth / 2 + OFFSET - LODGESIZE.width,
            },
            rotation: {
                x: 0,
                y: Math.PI / 2,
                z: 0
            },
            scale: (OFFSET - LODGESIZE.width - 0.025) / 0.2,
        })
    }

    return { lbeams, sbeams }
}

export function getRoofEdges(width, depth) {
    const edges = [];
    const roofCorners = [];

    edges.push({
        pos: {
            x: -width / 2 - OFFSET - LODGESIZE.width - 0.02,
            y: BALKSIZE.height + 2 * LODGEDELTAHEIGHT + LODGESIZE.depth,
            z: depth / 2 + OFFSET - 0.07
        },
        rotation: {
            x: 0,
            y: Math.PI / 2,
            z: 0
        },
        scale: depth + 2 * OFFSET - 0.14,
    })

    edges.push({
        pos: {
            x: width / 2 + OFFSET + LODGESIZE.width - 0.02,
            y: BALKSIZE.height + 2 * LODGEDELTAHEIGHT + LODGESIZE.depth,
            z: -depth / 2 - OFFSET + 0.07
        },
        rotation: {
            x: 0,
            y: -Math.PI / 2,
            z: 0
        },
        scale: depth + 2 * OFFSET - 0.14,
    })

    edges.push({
        pos: {
            x: width / 2 + OFFSET + LODGESIZE.width - 0.04,
            y: BALKSIZE.height + 2 * LODGEDELTAHEIGHT + LODGESIZE.depth,
            z: depth / 2 + OFFSET + 0.01
        },
        rotation: {
            x: 0,
            y: Math.PI,
            z: 0
        },
        scale: width + 2 * OFFSET - 0.06,
    })

    edges.push({
        pos: {
            x: -width / 2 - OFFSET - LODGESIZE.width + 0.04,
            y: BALKSIZE.height + 2 * LODGEDELTAHEIGHT + LODGESIZE.depth,
            z: -depth / 2 - OFFSET - 0.01,
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: width + 2 * OFFSET - 0.06,
    })

    roofCorners.push({
        pos: {
            x: -width / 2 - OFFSET - LODGESIZE.width - 0.02,
            y: BALKSIZE.height + 2 * LODGEDELTAHEIGHT + LODGESIZE.depth + 0.001,
            z: depth / 2 + OFFSET + LODGESIZE.width / 2,
        },
        rotation: {
            x: 0,
            y: Math.PI / 2,
            z: 0
        },
    })

    roofCorners.push({
        pos: {
            x: width / 2 + OFFSET + LODGESIZE.width - 0.02,
            y: BALKSIZE.height + 2 * LODGEDELTAHEIGHT + LODGESIZE.depth + 0.001,
            z: depth / 2 + OFFSET + LODGESIZE.width / 2
        },
        rotation: {
            x: 0,
            y: -Math.PI,
            z: 0
        },
    })

    roofCorners.push({
        pos: {
            x: -width / 2 - OFFSET - LODGESIZE.width - 0.02,
            y: BALKSIZE.height + 2 * LODGEDELTAHEIGHT + LODGESIZE.depth + 0.001,
            z: -depth / 2 - OFFSET - LODGESIZE.width / 2
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
    })

    roofCorners.push({
        pos: {
            x: width / 2 + OFFSET + LODGESIZE.width - 0.02,
            y: BALKSIZE.height + 2 * LODGEDELTAHEIGHT + LODGESIZE.depth + 0.001,
            z: -depth / 2 - OFFSET - LODGESIZE.width / 2
        },
        rotation: {
            x: 0,
            y: -Math.PI / 2,
            z: 0
        },
    })

    return { edges, roofCorners }
}