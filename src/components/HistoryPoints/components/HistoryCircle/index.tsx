import React, { FC, useRef, useState } from 'react';
import Arrow from '../../../../assets/img/arrow.svg';
import { TMockDataOnce } from '../../types';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/all';

import styles from './HistoryCircle.module.scss';

gsap.registerPlugin(MotionPathPlugin)

const addZero = (number: number): string => {
    return number < 10 ? "0" + number : number.toString();
}

const getCurrentDataIndexElem = (data: TMockDataOnce[], activeDataElement: TMockDataOnce) => {
    return data.findIndex(item => item[0] === activeDataElement[0])
}

const maxMinFromActiveEl = (active: TMockDataOnce): [number, number] => {
    const arr = active.slice(1) as Array<[number, string]>;
    const numArr = arr.reduce<number[]>((acc, item) => {
        acc.push(item[0])
        return acc
    }, []);
    const min = Math.min.apply(Math, numArr);
    const max = Math.max.apply(Math, numArr);

    return [min, max]
}

interface IRotateCircleAnimArgs {
    ratio?: number, 
    ref: HTMLDivElement, 
    direction: 'right' | 'left',
    circleAngelRotate: number,
    setCircleAngelRotate: React.Dispatch<React.SetStateAction<number>>,
    setIsDotesAnimating: React.Dispatch<React.SetStateAction<boolean>>
}
const rotateCircleAnimation = ({
    ratio = 1, 
    ref, 
    direction,
    circleAngelRotate,
    setCircleAngelRotate,
    setIsDotesAnimating
}: IRotateCircleAnimArgs):void => {
    gsap.to(ref, {
        duration: 1,
        ease: "power1.inOut",
        rotate: direction === 'right' ? ratio*45 + circleAngelRotate : -ratio*45 + circleAngelRotate,
        onComplete: () => {
            setCircleAngelRotate(state => direction === 'right' ? ratio*45 + circleAngelRotate : -ratio*45 + circleAngelRotate)
            setIsDotesAnimating(state => false)
        },
        onStart: () => {
            setIsDotesAnimating(state => true)
        }
    })
}

interface IRotateDotsAnimArgs {
    ratio?: number,
    ref: HTMLDivElement[],
    direction: 'right' | 'left',
    circleAngelRotate: number
}
const rotateDotsAnimation = ({
    ratio = 1,
    ref,
    direction,
    circleAngelRotate
}: IRotateDotsAnimArgs):void => {
    ref.forEach((dot, i) => {
        gsap.to(dot, {
            duration: 1,
            ease: "power1.inOut",
            rotate: direction === 'right' ? -(ratio*45 + circleAngelRotate) : ratio*45 - circleAngelRotate,
        })
    })
}

interface HistoryCircleProps {
    data: TMockDataOnce[],
    activeDataElement: TMockDataOnce,
    setActiveDataElement: React.Dispatch<React.SetStateAction<TMockDataOnce>>
}

const HistoryCircle: FC<HistoryCircleProps> = ({data, activeDataElement, setActiveDataElement}) => {

    const dotesRef = useRef<HTMLDivElement[]>([]);
    const labelsRef = useRef<HTMLDivElement[]>([]);
    const circleRef = useRef<HTMLDivElement>(null);
    const [circleAngelRotate, setCircleAngelRotate] = useState<number>(0);
    const [isDotesAnimating, setIsDotesAnimating] = useState<boolean>(false);
    const currentActiveElementIndex = data.map(item => item[0]).indexOf(activeDataElement[0]);
    const [since, to] = maxMinFromActiveEl(activeDataElement);

    const animateCircles = (direction: 'right' | 'left') => {

        if (!circleRef.current || !dotesRef.current) return;

        const currentElIndex = getCurrentDataIndexElem(data, activeDataElement);

        if (direction === 'right') {
            if (currentElIndex === 0 || currentElIndex === 3) {
                rotateCircleAnimation({
                    ratio: 2, 
                    ref: circleRef.current, 
                    direction: 'right', 
                    circleAngelRotate, 
                    setCircleAngelRotate, 
                    setIsDotesAnimating
                })
                rotateDotsAnimation({
                    ratio: 2,
                    ref: dotesRef.current,
                    direction: 'right',
                    circleAngelRotate
                })
            } else {
                rotateCircleAnimation({
                    ref: circleRef.current, 
                    direction: 'right', 
                    circleAngelRotate, 
                    setCircleAngelRotate, 
                    setIsDotesAnimating
                })
                rotateDotsAnimation({
                    ref: dotesRef.current,
                    direction: 'right',
                    circleAngelRotate
                })
            }
        } else {
            if (currentElIndex === 2 || currentElIndex === 5) {
                rotateCircleAnimation({
                    ratio: 2, 
                    ref: circleRef.current, 
                    direction: 'left', 
                    circleAngelRotate, 
                    setCircleAngelRotate, 
                    setIsDotesAnimating
                })
                rotateDotsAnimation({
                    ratio: 2,
                    ref: dotesRef.current,
                    direction: 'left',
                    circleAngelRotate
                })
            } else {
                rotateCircleAnimation({
                    ref: circleRef.current, 
                    direction: 'left', 
                    circleAngelRotate, 
                    setCircleAngelRotate, 
                    setIsDotesAnimating
                })
                rotateDotsAnimation({
                    ref: dotesRef.current,
                    direction: 'left',
                    circleAngelRotate
                })
            }
        }
    }
    
    return (
        <div className={styles.history_circle}>
            <div className={styles.circleBlock}>
                <div className={styles.circle} ref={circleRef}>
                    {data.map((item, i) => (
                        <div 
                            key={item[0]}
                            ref={(el) => el ? dotesRef.current.push(el) : []}
                            className={activeDataElement[0] === item[0] ? `${styles.dot} ${styles.active}` : styles.dot}
                            onClick={() => setActiveDataElement(state => item)}
                        >
                            <div className={styles.dot__number}>{++i}</div>
                            <div 
                                ref={(el) => el ? labelsRef.current.push(el) : []}
                                className={styles.dot__label}
                            >
                                {item[0]}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.date}>
                    <span className={styles.date__from}>{since}</span>
                    <span className={styles.date__to}>{to}</span>
                </div>
            </div>
            <div className={styles.controls}>
                <p className={styles.count}>
                    {addZero(currentActiveElementIndex + 1)}/{addZero(data.length)}
                </p>
                <button 
                    onClick={(e) => {
                        setActiveDataElement(state => data[currentActiveElementIndex + 1 > data.length - 1 ? 0 : currentActiveElementIndex + 1])
                        animateCircles('left')
                    }}
                    className={`${styles.controls__btn}`}
                    disabled={isDotesAnimating}
                >
                    <img src={Arrow} alt="arrow_left" />
                </button>
                <button 
                    onClick={(e) => {
                        setActiveDataElement(state => data[currentActiveElementIndex - 1 < 0 ? data.length - 1 : currentActiveElementIndex - 1])
                        animateCircles('right')
                    }}
                    className={`${styles.controls__btn} ${styles.controls__btn_right}`}
                    disabled={isDotesAnimating}
                >
                    <img src={Arrow} alt="arrow_right" />
                </button>
            </div>
        </div>
    );
};

export default HistoryCircle;