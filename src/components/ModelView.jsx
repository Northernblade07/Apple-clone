import { Html, OrbitControls, View } from '@react-three/drei'
import React, { Suspense } from 'react'
import Lights from './Light'
import Iphone from './Iphone'
import * as Three from 'three'
import Loader from './Loader'

const ModelView = ({index,groupRef,gsapType,ControlRef,SetRotationState, item,size}) => {
  return (
    <View index={index} id={gsapType} className={` w-full h-full ${index===2? 'right-[-100%]':''} absolute `}>
        
        {/* Ambient Light */}
        <ambientLight intensity={4}/>

        {/* camera */}
        <perspectiveCamera makeDefault position={[0,0,4]}/>
        <Lights/>
        <OrbitControls makeDefault ref={ControlRef} enableZoom={false} enablePan={false} rotateSpeed={0.4} target={new Three.Vector3(0,0,0)} onEnd={()=>SetRotationState(ControlRef.current.getAzimuthalAngle())}/>

        <group ref={groupRef} name={`${index===1}?'small':'large'`} position={[0,0,0]}>

        <Suspense fallback={<Loader/>}>
            <Iphone scale={index=== 1?[23,23,23]:[25,25,25]} item={item} size={size}/>
        </Suspense>
        </group>
    </View>
  )
}

export default ModelView
