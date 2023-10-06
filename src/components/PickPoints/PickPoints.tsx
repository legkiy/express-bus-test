import { FC, memo, useEffect, useId, useState, Dispatch } from 'react';
import { PickPoint } from '..';
import style from './PickPoints.module.scss';
import state from '../../../public/data/state.json';

export type PickPointType = {
  address: string;
  budgets: string[];
  latitude: number;
  longitude: number;
};

interface IPickPoints {
  onSelectPoint: React.Dispatch<PickPointType>;
  points: PickPointType[];
  setPoints: Dispatch<React.SetStateAction<PickPointType[]>>;
}
const PickPoints: FC<IPickPoints> = ({ onSelectPoint, points, setPoints }) => {
  const [errorData, setErrorData] = useState<string>();
  const id = useId();

  const getState = async () => {
    try {
      const res = await fetch('./data/state.json');
      const data: { pickPoints: PickPointType[] } = await res.json();
      setPoints(data.pickPoints);
    } catch (e) {
      console.log('Error: ', e);
      setErrorData(
        'Похоже, не удалось загрузить данные. Возможно запущен собранный проект, сейчас попробую загруть другим способом.'
      );
      setTimeout(() => {
        setPoints(state.pickPoints);
      }, 100);
    }
  };

  useEffect(() => {
    getState();
  }, []);

  return (
    <div className={style['pick-points-list']}>
      {!!errorData && !points.length && errorData}
      {!errorData && !points.length && 'Loading...'}
      {points.map((el) => (
        <PickPoint
          key={id}
          address={el.address}
          budgets={el.budgets}
          latitude={el.latitude}
          longitude={el.longitude}
          onClick={onSelectPoint}
        />
      ))}
    </div>
  );
};
export default memo(PickPoints);
