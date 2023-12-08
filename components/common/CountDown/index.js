import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { memo } from 'react';
import { useState } from 'react';

const CountDown = ({ listMission }) => {
  const [remainingTime, setRemainingTime] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (listMission) {
      let missionEndTime = moment(listMission?.begin_mission)
        .clone()
        .add(listMission?.mission_time, 'minutes')
        .add(10, 'seconds');
      function calcTime() {
        let currentTime = moment();
        let remainingTime = moment.duration(missionEndTime.diff(currentTime));
        setRemainingTime(remainingTime);
      }
      let id = setInterval(calcTime, 1000);
      return () => {
        clearInterval(id);
      };
    }
  }, [listMission]);
  useEffect(() => {
    if (remainingTime && remainingTime?.asMilliseconds() <= 0) {
      router.reload();
    }
  }, [remainingTime]);

  //   console.log({ remainingTime: remainingTime?.asMilliseconds() });

  return (
    // <p className="text-[16px]">
    //   Bạn còn <span className="font-bold">{countDown}</span> để hoàn thành nhiệm vụ
    // </p>
    <p className="text-[16px]">
      Bạn còn {remainingTime?.minutes()} phút {remainingTime?.seconds()} giây để hoàn thành nhiệm vụ
    </p>
  );
};

export default memo(CountDown);
