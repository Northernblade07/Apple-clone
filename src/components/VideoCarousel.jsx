import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from "../constant"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { pauseImg, playImg, replayImg } from '../utils'
const VideoCarousel = () => {
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([]);
    // video and indicators that tells the status of the video 
    const [video, setvideo] = useState({
        isEnd: false,
        StartPlay: false,
        VidoeId: 0,
        isLastVideo: false,
        isPlaying: false,
    })

    const [loadedData, SetLoadedData] = useState([])
    const { isEnd, StartPlay, VidoeId, isLastVideo, isPlaying } = video;

    useGSAP(()=>{

        gsap.to('#slider',{
            transform:`translateX(${-100 * VidoeId}%)`,
            duration:2,
            ease:'power2.inOut'
        })

        gsap.to('#video',{
            scrollTrigger :{
                trigger:'#video',
                toggleActions:'restart none none none',

            },
            onComplete: ()=>{
                setvideo((prev)=>({...prev,StartPlay:true,isPlaying:true}));
            }
        });
    },[isEnd,VidoeId]);

    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[VidoeId].pause();

            } else {
                StartPlay && videoRef.current[VidoeId].play()
            }
        }
    }, [StartPlay, VidoeId, isPlaying, loadedData])

    const handleLoadedMetaData=(i,e)=>SetLoadedData((prev)=>[...prev,e])

    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;
        if (span[VidoeId]) {
            //animate the progress bar of the respective video
            let anim = gsap.to(span[VidoeId], {
                onUpdate: () =>{
                    const progress = Math.ceil(anim.progress() * 100);
                    if (progress !=currentProgress) {
                        currentProgress = progress;

                        gsap.to(videoDivRef.current[VidoeId],{
                            width : window.innerWidth< 760 ?'10vw': window.innerWidth<1200 ? '10vw':'4vw'
                        })

                        gsap.to(span[VidoeId],{
                            width:`${currentProgress}%`,
                            backgroundColor : 'white'
                        })
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[VidoeId],{
                            width:'12px'
                        })
                        gsap.to(span[VidoeId],{
                            backgroundColor:'#afafaf'
                        })
                    }
                },

            })

            if (VidoeId === 0 ) {
                anim.restart()
            }
            const animUpdate = ()=>{
                anim.progress(videoRef.current[VidoeId].currentTime / hightlightsSlides[VidoeId].videoDuration)
            }
    
        if (isPlaying) {
            gsap.ticker.add(animUpdate);
        }else{
            gsap.ticker.remove(animUpdate)
        }
        }

    }, [VidoeId, StartPlay])
  
    const handleProcess = (type, i) => {
        switch (type) {
            case 'video-end':
                setvideo((prev) => ({ ...prev, isEnd: true, VidoeId: i + 1 }))
                break;
            case 'video-last':
                setvideo((prev) => ({ ...prev, isLastVideo: true }))
                break;
            case 'video-reset':
                setvideo((prev) => ({ ...prev, isLastVideo: false, VidoeId: 0 }))
                break;

            case 'play':
                setvideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))
                break;
            case 'pause':
                setvideo((prev)=>({...prev,isPlaying:!prev.isPlaying}))  
                break;  
            default:
                return video;

        }
    }

    return (
        <>
            <div className='flex items-center'>
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
                        <div className='video-carousel_container'>
                            <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                                <video ref={(el) => (videoRef.current[i] = el)} onPlay={() => {
                                    setvideo((prevVideo) => ({
                                        ...prevVideo, isPlaying: true
                                    }))
                                }} id='video' muted playsInline={true} preload='auto' onLoadedMetadata={(e)=>handleLoadedMetaData(i,e)} 
                                 onEnded={()=>
                                    i !==3 ? 
                                    handleProcess('video-end',i):
                                    handleProcess('video-last',i)
                                 }
                                 
                                 className={`${list.id===2&& 'translate-x-44 '}
                                 pointer-events-none`}
                                 >
                                    <source src={list.video} type='video/mp4' />
                                </video>
                            </div>

                            <div className='absolute top-12 left-[5%] z-10'>
                                {list.textLists.map((item, i) => (
                                    <p key={i} className='md:text-2xl text-xl font-serif'>
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='relative flex-center mt-10 '>
                <div className='flex-center bg-gray-300 py-5 px-7 backdrop-blur rounded-full'>
                    {videoRef.current.map((_, i) => (
                        <span ref={(e) => (videoDivRef.current[i] = e)} key={i} className='mx-2 w-3 h-3 bg-gray-200 rounded-full cursor-pointer relative cursor-pointer'>
                            <span className='absolute h-full w-full rounded-full ' ref={(e) => (videoSpanRef.current[i] = e)}>

                            </span>
                        </span>
                    ))}
                </div>
                <button className='control-btn'>
                    <img onClick={
                        isLastVideo ? () =>
                            handleProcess('video-reset') : !isPlaying ? () => handleProcess('play') : () => handleProcess('pause')
                    } src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} alt="" />
                </button>

            </div>
        </>
    )
}

export default VideoCarousel
