import React, {FC, useEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
import {Navigation} from 'swiper/modules';

import 'swiper/scss';
import styles from './HistorySlider.module.scss';
import SliderButtonControl from './SliderButtonControl';
import { TMockDataOnce } from '../../types';

interface HistorySliderProps {
    data: TMockDataOnce[1][]
}

const HistorySlider: FC<HistorySliderProps> = ({data}) => {

    const [isBeginner, setIsBeginner] = useState<boolean>(false);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    return (
        <div className={styles.history_slider}>
            <div className={styles.sliderWrapper}>
                <Swiper
                    className={styles.swiper_custom}
                    modules={[Navigation]}
                    spaceBetween={80}
                    slidesPerView={3}
                    onSlideChange={swiper => {
                        swiper.isBeginning ? setIsBeginner(true) : setIsBeginner(false);
                        swiper.isEnd ? setIsEnd(true) : setIsEnd(false)
                    }}
                    onSwiper={swiper => {
                        swiper.isBeginning ? setIsBeginner(true) : setIsBeginner(false);
                        swiper.isEnd ? setIsEnd(true) : setIsEnd(false)
                    }}
                    grabCursor
                >
                    {data.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className={styles.slide}>
                                <h4 className={styles.slide__title}>{item[0]}</h4>
                                <p className={styles.slide__text}>
                                    {item[1]}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                    
                    <SliderButtonControl type='prev' left={30} disable={isBeginner} />
                    <SliderButtonControl type='next' right={30} disable={isEnd} />
                </Swiper>
            </div>
        </div>
    );
};


export default HistorySlider;