import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import ModelView from './ModelView'
import { yellowImg } from '../utils'
import * as Three from 'three'
import { View } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { models, sizes } from '../constant'
// import { div } from 'three/tsl'
import { animateWithGsapTimeline } from '../utils/animations'
const Model = () => {
    const [size, setsize] = useState('small')
    const [model, setmodel] = useState({
        title: 'iphone 15 pro',
        color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
        img: yellowImg,
    })

    //camera control for the model 
    const CameraControlSmall = useRef()
    const CameraControlLarge = useRef();

    // models
    // these are the actual model themselves 
    const small = useRef(new Three.Group());
    const large = useRef(new Three.Group());


    // rotations 
    const [SmallRotation, setSmallRotation] = useState(0);
    const [LargeRotation, setLargeRotation] = useState(0)

    const tl = gsap.timeline();
    useEffect(()=>{
        if (size==='large') {
        animateWithGsapTimeline(tl,small,SmallRotation,'#view1','#view2',{
            transform:'translateX(-100%)',
            duration:2,
        })
        }


        if (size ==='small') {
            animateWithGsapTimeline(tl,large,LargeRotation,'#view2','#view1',{
                transform:'translateX(0)',
                duration:2,
            })
        }
    },[size])

    useGSAP(() => {
        gsap.to('#heading', {
            y: 0,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
                trigger: '#heading'
            }
        })
    }, [])
    return (
        <section className='common-padding'>
            <div className='screen-max-width'>
                <h1 id='heading' className='section-heading'>Take a closer look</h1>
                <div className='flex flex-col items-center mt-5 '>
                    <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
                        <ModelView
                            index={1}
                            groupRef={small}
                            gsapType='view1'
                            ControlRef={CameraControlSmall}
                            SetRotationState={setSmallRotation}
                            item={model}
                            size={size}
                        />

                        <ModelView
                            index={2}
                            groupRef={large}
                            gsapType='view2'
                            ControlRef={CameraControlLarge}
                            SetRotationState={setLargeRotation}
                            item={model}
                            size={size}
                        />

                        <Canvas className='w-full h-full ' style={{
                            position:'fixed',
                            top:0,
                            bottom:0,
                            right:0,
                            left:0,
                            overflow:'hidden'
                        }}
                        eventSource={document.getElementById('root')}>
                                <View.Port/>
                        </Canvas>

                    </div>
                        <div className='mx-auto w-full '>
                            <p className='text-sm mb-5 font-light text-center'>{model.title}</p>
                            <div className='flex-center '>
                                <ul className='color-container'>
                                    {
                                        models.map((item,i)=>(
                                            <li key={i} className='w-6 h-6 rounded-full mx-2 cursor-pointer' style={{
                                                backgroundColor:item.color[0]
                                            }} onClick={()=>setmodel(item)}>
                                                {/* <div className={`border-[50%] ${item.color} h-3 w-3`}></div> */}
                                                {/* {item.id} */}
                                            </li>
                                        ))
                                    }
                                </ul>

                                <button className='size-btn-container'>{sizes.map(({label,value})=>(
                                    <span className='size-btn ' style={{
                                        backgroundColor: size === value?"white":'transparent',
                                        color:size === value?"black":'white'
                                    }} key={label} onClick={()=>setsize(value)}>{label}</span>
                                ))}</button>


                            </div>
                        </div>
                </div>
            </div>
        </section>
    )
}

export default Model
