import * as THREE from 'three'
import { useRef, useEffect, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
//import { useHelper } from '@react-three/drei'
import { useControls } from 'leva'

export default function MorphedCube({ spherify = 1, twist = 0, animate = true, ...props }) {
  /*** Core object */
  const influences = [spherify, twist]
  const meshRef = useRef()
  const geoMemo = useMemo(() => createGeometry(), [])

  /*** Helpers ******* */
  // Drei useHelper has a bug
  //const dreiHelper = useHelper(meshRef, THREE.BoxHelper, 'cyan')
  const r3fHelperRef = useRef()
  const basicThreeHelperRef = useRef()

  //setup the basic three.js helper
  // when component constructed
  const { scene } = useThree()
  useEffect(() => {
    // Setup the basic three.js helper
    basicThreeHelperRef.current = new THREE.BoxHelper(meshRef.current, 0xe815db)
    //add it to the scene
    scene.add(basicThreeHelperRef.current)
  }, [basicThreeHelperRef, scene])

  // Controls to turn helpers off/on
  // NOTE I only use onChange ONCE on the three.js helper to show it as an optional way to change the visibilty
  //showDreiHelper
  const { showBasicHelper, showR3fHelper } = useControls("Helper's Visibility", {
    // showDreiHelper: { label: 'Drei', value: true },
    showBasicHelper: {
      label: 'Pure Three',
      value: true,
      onChange: (val) => {
        basicThreeHelperRef.current.visible = val
        if (logToggling) console.log('Setting visible of pure thee.js helper to:', val, 'result:', basicThreeHelperRef.current.visibile)
      },
      transient: false,
    },
    showR3fHelper: { label: 'R3F Wrapped', value: true },
  })
  const { logToggling } = useControls('Debug', { logToggling: { label: 'Log toggling', value: false } }, { collapsed: true })

  /*****Listen for the showDreiHelper value to change, if it does change the visibilty
   * NOTE I did it this way to show using useEffect as a subscription to the state change
   * Using onChange() from leva is clearly easy in this demo, but your usecase may not have it
   * Maybe you use your own store, state, etc
   */
  /*
  useEffect(() => {
    dreiHelper.current.visible = showDreiHelper
    if (logToggling) console.log('showDreiHelper useEffect changing visible to:', showDreiHelper, 'Result:', dreiHelper.current.visible)
  }, [showDreiHelper, dreiHelper])
  */

  // Debug fn to check actuals
  useEffect(() => {
    if (logToggling) {
      console.log(
        //'showDreiHelper :', showDreiHelper,
        'showBasicHelper:',
        showBasicHelper,
        'showR3fHelper',
        showR3fHelper
      )

      console.log(
        //'Drei helper actual visible:',dreiHelper.current.visible,
        'Basic Helper viz:',
        basicThreeHelperRef.current.visible,
        'r3f viz:',
        r3fHelperRef.current.visible
      )
    }
  })

  // three.js loop
  useFrame(() => {
    if (animate) {
      meshRef.current.rotation.x = meshRef.current.rotation.y += isSelected ? 0.03 : 0.01
      // Update our additional helpers
      //NOTE: using the useHelper hook does this automatically
      if (r3fHelperRef.current.visible) r3fHelperRef.current.update()
      basicThreeHelperRef.current.update()
    }
  })

  /*** Selection ***************     */
  const [isSelected, setSelected] = useState(false)

  // Simple way to get trigged when the root canvas gets clicked meaning I wasnt
  useEffect(() => {
    setSelected(false)
    basicThreeHelperRef.current.visible = false
    // put it as a dependency so this ONLY fires when that property changes
  }, [props.resetSelection, basicThreeHelperRef])

  // watch selection and set the value on the pure three helper
  useEffect(() => {
    if (showBasicHelper) basicThreeHelperRef.current.visibile = isSelected
  }, [isSelected, showBasicHelper, basicThreeHelperRef])

  function handleClick(e) {
    setSelected(true)
  }

  return (
    <>
      <mesh
        ref={meshRef}
        {...props}
        geometry={geoMemo}
        onClick={handleClick}
        morphTargetInfluences={influences}
        scale={isSelected ? 1.5 : 1}
      >
        <meshNormalMaterial color={'red'} />
      </mesh>
      {/*se visibilty prop thats on all Object3D's */}
      <boxHelper ref={r3fHelperRef} args={[meshRef.current, 'red']} visible={showR3fHelper && isSelected} />
    </>
  )
}

// default geometry from three.js morphTargets example: https://github.com/mrdoob/three.js/blob/master/examples/webgl_morphtargets.html
function createGeometry() {
  const geometry = new THREE.BoxGeometry(2, 2, 2, 32, 32, 32)

  // create an empty array to  hold targets for the attribute we want to morph
  // morphing positions and normals is supported
  geometry.morphAttributes.position = []

  // the original positions of the cube's vertices
  const positionAttribute = geometry.attributes.position

  // for the first morph target we'll move the cube's vertices onto the surface of a sphere
  const spherePositions = []

  // for the second morph target, we'll twist the cubes vertices
  const twistPositions = []
  const direction = new THREE.Vector3(1, 0, 0)
  const vertex = new THREE.Vector3()

  for (let i = 0; i < positionAttribute.count; i++) {
    const x = positionAttribute.getX(i)
    const y = positionAttribute.getY(i)
    const z = positionAttribute.getZ(i)

    spherePositions.push(
      x * Math.sqrt(1 - (y * y) / 2 - (z * z) / 2 + (y * y * z * z) / 3),
      y * Math.sqrt(1 - (z * z) / 2 - (x * x) / 2 + (z * z * x * x) / 3),
      z * Math.sqrt(1 - (x * x) / 2 - (y * y) / 2 + (x * x * y * y) / 3)
    )

    // stretch along the x-axis so we can see the twist better
    vertex.set(x * 2, y, z)

    vertex.applyAxisAngle(direction, (Math.PI * x) / 2).toArray(twistPositions, twistPositions.length)
  }

  // add the spherical positions as the first morph target
  geometry.morphAttributes.position[0] = new THREE.Float32BufferAttribute(spherePositions, 3)

  // add the twisted positions as the second morph target
  geometry.morphAttributes.position[1] = new THREE.Float32BufferAttribute(twistPositions, 3)

  return geometry
}
