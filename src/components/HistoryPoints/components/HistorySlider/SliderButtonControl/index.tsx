import React, {FC, memo} from 'react';
import {useSwiper} from "swiper/react";
import styles from './SliderButtonControl.module.scss';

interface SliderButtonControl {
    type: 'next' | 'prev',
    left?: number,
    right?: number,
    disable?: boolean
}

const SliderButtonControl: FC<SliderButtonControl> = ({type, left, right, disable}) => {

    const swiper = useSwiper();
    const classNames = `${styles.sliderControls__btn} ${type === 'prev' ? styles.sliderControls__btn_prev : styles.sliderControls__btn_next}` 
    const handleClick = () => {
        if (type === 'prev') {
            swiper.slidePrev()
        } else {
            swiper.slideNext()
        }
    }

    return (
        <button 
            className={classNames}
            onClick={handleClick}
            style={
                left ? {left: left + "px"} :
                right ? {right: right + "px"} : {}
            }
            disabled={disable}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2"/>
            </svg>
        </button>
    );
};

export default memo(SliderButtonControl);