/* eslint-disable react/no-unknown-property */

import { useGLTF } from '@react-three/drei'

export function Model(props) {
    const { nodes, materials } = useGLTF('/heel.glb')
    return (
        <group {...props} dispose={null}>
            <mesh castShadow receiveShadow geometry={nodes.sole.geometry} material={materials.sole} />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.inner_base.geometry}
                material={materials.inner_base}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.inner_side.geometry}
                material={materials.inner_side}
            />
            <mesh castShadow receiveShadow geometry={nodes.body.geometry} material={materials.body} />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.shadow_plane.geometry}
                material={materials.shadow_plane}
                scale={4.77}
            />
        </group>
    )
}

useGLTF.preload('/heel.glb')


