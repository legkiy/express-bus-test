import { FC, memo, useId } from 'react';
import style from './PickPoint.module.scss';
import { PickPointType } from '../PickPoints';

interface IPickPoint {
  address: string;
  budgets: string[];
  latitude: number;
  longitude: number;
  onClick: React.Dispatch<PickPointType>;
}
const PickPoint: FC<IPickPoint> = ({
  address,
  budgets,
  latitude,
  longitude,
  onClick,
}) => {
  const id = useId();
  const handelClick = () => {
    onClick({ address, budgets, latitude, longitude });
  };
  return (
    <div className={style['pick-point']} onClick={() => handelClick()}>
      <h3 className={style.address}>{address}</h3>
      <div>
        <ul className={style.badgets}>
          {budgets.map((budget) => (
            <li key={id} className={style.badget}>
              {budget}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default memo(PickPoint);
