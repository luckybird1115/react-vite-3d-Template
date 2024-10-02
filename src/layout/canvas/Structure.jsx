
import { useMemo } from "react";
import useStore from "../../store";
import { VerticalBalk, BalkCorner, HorizontalBalk } from "../../components/Balk";
import { HLodge, LodgeBoard, Ruberoid, } from "../../components/Lodge";
import { RoofEdgeA, RoofCorner } from "../../components/RoofEdge";
import { getBalks, getHLodge, getBeam, getRoofEdges } from "../../utils";

import { LongBeam, ShortBeam } from "../../components/Beam";
import { ShowDimension } from "../../components/Dimension";
const Structure = () => {
    const foundationSize = useStore((s) => s.foundationSize);

    const {
        vBalks, corners, hbalks,
    } = useMemo(() => getBalks(foundationSize.width, foundationSize.depth), [foundationSize])

    const {
        hLodges, lodgeboards, ruberoids,
    } = useMemo(() => getHLodge(foundationSize.width, foundationSize.depth), [foundationSize])

    const {
        lbeams, sbeams,
    } = useMemo(() => getBeam(foundationSize.width, foundationSize.depth), [foundationSize])

    const {
        edges, roofCorners,
    } = useMemo(() => getRoofEdges(foundationSize.width, foundationSize.depth), [foundationSize])

    return (
        <>
            {vBalks.map((vBalk, i) => (
                <VerticalBalk
                    key={i}
                    balk={vBalk}
                />
            ))}

            {corners.map((corner, i) => (
                <BalkCorner
                    key={i}
                    balk={corner}
                />
            ))}


            {hbalks.map((hBalk, i) => (
                <HorizontalBalk
                    key={i}
                    balk={hBalk}
                />
            ))}

            {hLodges.map((hLodge, i) => (
                <HLodge
                    key={i}
                    lodge={hLodge}
                />
            ))}

            {lodgeboards.map((board, i) => (
                <LodgeBoard
                    key={i}
                    board={board}
                />
            ))}

            {lbeams.map((beam, i) => (
                <LongBeam
                    key={i}
                    beam={beam}
                />
            ))}

            {sbeams.map((beam, i) => (
                <ShortBeam
                    key={i}
                    beam={beam}
                />
            ))}

            {ruberoids.map((ruberoid, i) => (
                <Ruberoid
                    key={i}
                    ruberoid={ruberoid}
                />
            ))}

            {edges.map((edge, i) => (
                <RoofEdgeA
                    key={i}
                    edge={edge}
                />
            ))}

            {roofCorners.map((corner, i) => (
                <RoofCorner
                    key={i}
                    corner={corner}
                />
            ))}

            <ShowDimension />
        </>
    );
}; export default Structure;