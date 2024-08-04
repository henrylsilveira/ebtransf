
// import * as THREE from 'three'
// import React, { useRef } from 'react'
// import { useGLTF, PerspectiveCamera } from '@react-three/drei'
// import { GLTF } from 'three-stdlib'

// type GLTFResult = GLTF & {
//   nodes: {
//     Cube_2: THREE.Mesh
//     Cube: THREE.Mesh
//     Text_2: THREE.Mesh
//     Text: THREE.Mesh
//   }
//   materials: {}
// }

export function Logo3d(props: any) {
  // const { nodes, materials } = useGLTF('/logo3d.gltf') as GLTFResult
  return (
    <></>
    // <group {...props} dispose={null}>
    //   <group scale={0.01}>
    //     <group position={[-1165.64, -23.953, 2026.425]} scale={[1, 1, 0.111]}>
    //       <mesh
    //         castShadow
    //         receiveShadow
    //         geometry={nodes.Cube_2.geometry}
    //         material={nodes.Cube_2.material}
    //         position={[2130.964, 98.437, -1077.646]}
    //         scale={[12.313, 1, 1]}
    //       />
    //       <mesh
    //         castShadow
    //         receiveShadow
    //         geometry={nodes.Cube.geometry}
    //         material={nodes.Cube.material}
    //         position={[1624.693, 90.927, -1101.513]}
    //         rotation={[-Math.PI, 0, -Math.PI]}
    //         scale={[12.313, 1, 0.957]}
    //       />
    //       <mesh
    //         castShadow
    //         receiveShadow
    //         geometry={nodes.Text_2.geometry}
    //         material={nodes.Text_2.material}
    //         position={[2112.41, 125.417, -1173.51]}
    //         scale={3.378}
    //       />
    //       <mesh
    //         castShadow
    //         receiveShadow
    //         geometry={nodes.Text.geometry}
    //         material={nodes.Text.material}
    //         position={[959.267, 118.703, -1233.441]}
    //         scale={3.378}
    //       />
    //       <directionalLight intensity={1.213} decay={2} rotation={[-3.11, -0.07, 0.429]} />
    //     </group>
    //     <PerspectiveCamera
    //       makeDefault={false}
    //       far={100000}
    //       near={5}
    //       fov={45}
    //       position={[1746.182, 1724.502, 3725.024]}
    //       rotation={[-Math.PI / 4, 0.615, Math.PI / 6]}
    //     />
    //   </group>
    // </group>
  )
}

// useGLTF.preload('/logo3d.gltf')