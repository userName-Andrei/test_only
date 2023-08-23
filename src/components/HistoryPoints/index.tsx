import React, { FC, useState } from 'react';
import HistoryCircle from './components/HistoryCircle';
import HistorySlider from './components/HistorySlider';
import { TMockDataOnce } from './types';

import styles from './HistoryPoints.module.scss';

interface HistoryPointsProps {
    data: TMockDataOnce[]
}

const HistoryPoints: FC<HistoryPointsProps> = ({data}) => {

    const [activeDataElement, setActiveDataElement] = useState<TMockDataOnce>(data[0]);
    let dataSlider: TMockDataOnce[1][] = activeDataElement.slice(1) as TMockDataOnce[1][];

    return (
        <div className={styles.history_points}>
            <div className={styles.title}>
                <h1 className={styles.title__text}>
                    Исторические <br /> 
                    даты
                </h1>
            </div>
            <HistoryCircle data={data} activeDataElement={activeDataElement} setActiveDataElement={setActiveDataElement} />
            <HistorySlider data={dataSlider} />
        </div>
    );
};

export default HistoryPoints;