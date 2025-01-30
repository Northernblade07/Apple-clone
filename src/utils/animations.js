import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger);
export const animateWithGsap=(target,animateProps, scrollProps)=>{
    gsap.to(target,{
        ...animateProps,
        scrollTrigger:{
            trigger:target,
            toggleActions:'restart reverse restart reverse',
            start: 'top 85%',
            ...scrollProps
        }
    })
}

export const animateWithGsapTimeline = (timeline, rotationRef, rotationState, firstTarget, secondeTarget, animationProps) => {
    timeline.to(rotationRef.current.rotation, {
        y: rotationState,
        duration: 1,
        ease: 'power2.inOut'
    })

    timeline.to(firstTarget, {
        ...animationProps, ease: 'power2.inOut',

    },
    '<'
    )

    timeline.to(secondeTarget, {
        ...animationProps, ease: 'power2.inOut',

    },
    '<'
    )
}