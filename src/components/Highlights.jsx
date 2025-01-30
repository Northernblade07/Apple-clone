import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { blueImg, rightImg, watchImg } from '../utils'
import VideoCarousel from './VideoCarousel'

const Highlights = () => {
  useGSAP(()=>{
    gsap.to('#title',{
      opacity:1,
      // delay:0.5,
      y:0,
    })
    gsap.to('.link',{
      opacity:1,
      y:0,
      duration:1,
      // delay:1,
      stagger:{
        amount:0.2
      }
    })
  })
  return (
    <section id='highlights' className='w-full overflow-hidden h-full common-padding bg-zinc '>
      <div className='screen-max-width'>
        <div className='mb-12 w-full items-center justify-between md:flex '>
          <h1 id='title' className='section-heading'>
            Get the Highlights
          </h1>
          <div className='flex gap-7 flex-wrap'>
            <p  className='link'>watch the film
              <img src={watchImg} className='ml-2' alt="" />
            </p>
            <p className='link'>watch the event
              <img src={rightImg} className='ml-2' alt="" />
            </p>
          </div>
        </div>

        <VideoCarousel/>
      </div>
      
    </section>
  )
}

export default Highlights
