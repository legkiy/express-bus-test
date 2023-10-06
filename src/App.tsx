import { useState } from 'react';
import style from './App.module.scss';
import { PickPoints, MyMap } from './components';
import { PickPointType } from './components/PickPoints/PickPoints';

export const App = () => {
  const [selectPoint, setSelectPoint] = useState<PickPointType>();
  const [points, setPoints] = useState<PickPointType[]>([]);

  return (
    <div>
      <h1 className={style.title}>Express-Шина - тестовое задание</h1>
      <div className={style.content}>
        <PickPoints
          onSelectPoint={setSelectPoint}
          points={points}
          setPoints={setPoints}
        />
        <MyMap points={points} selectPoint={selectPoint} />
      </div>
    </div>
  );
};
