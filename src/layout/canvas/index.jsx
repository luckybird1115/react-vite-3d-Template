/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls
} from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import { useControls } from 'leva'
import { useState } from 'react'
import MorphedCube from './MorphedCube'

/**
 * The main scene component, rendering the 3D scene.
 *
 * @return {JSX.Element} The JSX element representing the scene.
 */
const Scene = (props) => {

    const {
        resetSelection
    } = props;

    const { bgColor } = useControls('Page', {
        bgColor: '#2936ff',
    })

    const { animate, spherify, twist } = useControls('Shape', {
        spherify: {
            label: 'Spherify',
            value: 0,
            min: 0,
            max: 1,
            step: 0.01,
        },
        twist: {
            label: 'Twist',
            value: 0,
            min: 0,
            max: 2,
            step: 0.01,
        },
        animate: true,
    })


    const meshProps = { resetSelection, spherify, twist, animate }

    return (
        <>
            {/* Set the background color to white */}
            <color attach="background" args={[bgColor]} />

            {/* Orbit controls, allowing the user to pan, zoom, and rotate the scene */}
            <OrbitControls
                enableDamping
                target0={[0, 1, 0]}
                enableZoom={true}
                enablePan={true}
                zoomSpeed={2}
                rotateSpeed={1}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2}
                minDistance={5}
                maxDistance={20}
            />

            {/* Set up the directional light */}
            <directionalLight
                position={[2, 4, 4]}
                castShadow
                intensity={0.5}
                shadow-mapSize={2048}
                shadow-radius={2} // Adds softness to the shadows
                shadow-radi
                us={2} // Adds softness to the shadows
            />

            {/* Render the structure */}
            <Suspense fallback={null}>
                <MorphedCube {...meshProps} position={[0, 0, -2]} />
            </Suspense>
        </>
    );
};


/**
 * The main canvas component, rendering the 3D scene.
 *
 * @return {JSX.Element} The JSX element representing the canvas.
 */
const CanvasLayout = () => {
    const [resetSelection, triggerReset] = useState(0)
    return (
        <Canvas
            /**
             * The camera settings for the 3D scene.
             *
             * @property {number} fov The field of view, in degrees.
             * @property {Array.<number>} position The position of the camera, as an array of three numbers.
             * @property {number} near The near clipping plane, in meters.
             */
            camera={{
                fov: 70,
                position: [0, 5, 5],
                near: 0.001,
            }}

            /**
             * The shadow settings for the 3D scene.
             *
             * @property {boolean} enabled Whether shadows are enabled.
             * @property {number} type The type of shadow mapping, as a THREE.ShadowMapType constant.
             */
            shadows={{
                enabled: true,
                type: THREE.PCFSoftShadowMap
            }}

            /**
             * The WebGL settings for the canvas.
             *
             * @property {boolean} localClippingEnabled Whether local clipping is enabled.
             * @property {number} outputEncoding The output encoding, as a THREE.TextureEncoding constant.
             * @property {number} toneMapping The tone mapping, as a THREE.ToneMapping constant.
             * @property {number} toneMappingExposure The exposure of the tone mapping, in seconds.
             */
            gl={{
                localClippingEnabled: true,
                outputEncoding: 3000, // THREE.sRGBEncoding
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.5,
            }}
            onPointerMissed={() => triggerReset(Date.now())}
        >
            <Scene
                resetSelection={resetSelection}
            />
        </Canvas>
    );
};


export default CanvasLayout;