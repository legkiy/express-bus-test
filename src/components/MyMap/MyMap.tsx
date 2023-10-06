import { FC, useId, useMemo } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { PickPointType } from '../PickPoints/PickPoints';
import style from './MyMap.module.scss';
import pointIcon from '../../../public/icons/point.svg';

interface IMyMap {
  points: PickPointType[];
  selectPoint?: PickPointType;
}

const MyMap: FC<IMyMap> = ({ points, selectPoint }) => {
  const id = useId();

  const centralPoint = useMemo(
    () =>
      selectPoint
        ? { lat: selectPoint.latitude, lng: selectPoint.longitude }
        : { lat: points[0]?.latitude, lng: points[0]?.longitude },
    [points, selectPoint]
  );

  return (
    <div className={style['my-map']}>
      {!!points[0] && (
        <YMaps preload={true}>
          <Map
            className={style.map}
            state={{
              center: [centralPoint.lat, centralPoint.lng],
              zoom: selectPoint ? 14 : 4,
              controls: ['zoomControl'],
            }}
            defaultState={{
              center: [centralPoint.lat, centralPoint.lng],
              zoom: 4,
              controls: ['zoomControl'],
            }}
            modules={['control.ZoomControl']}
            defaultOptions={{
              autoFitToViewport: 'always',
              suppressMapOpenBlock: true,
              mapAutoFocus: true,
            }}
          >
            <Placemark
              geometry={[selectPoint?.latitude, selectPoint?.longitude]}
              key={id}
              modules={['geoObject.addon.balloon']}
              options={{
                iconLayout: 'default#image',
                iconImageHref: pointIcon,
              }}
              properties={{
                balloonContentBody: `<p>${
                  selectPoint?.address
                }</p><p> ${selectPoint?.budgets.map((el) => el)}</p>`,
              }}
            />
          </Map>
        </YMaps>
      )}
    </div>
  );
};
export default MyMap;
