import { Button } from 'antd';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { usePostVerifyMission } from '~/hooks/api/useMission';
import { titleCase } from '~/utils/strings';

const MissionItem = ({ item, refetchList = () => {} }) => {
  const { mutate } = usePostVerifyMission();
  const [loadingBtn, setLoadingBtn] = useState(undefined);

  function verifyMission(mission_id, key) {
    setLoadingBtn({
      id: mission_id,
      key: key,
    });
    mutate(
      {
        mission_id: mission_id,
        key: key,
      },
      {
        onSuccess: (data) => {
          if (!data?.error) {
            toast.success('Hoàn thành nhiệm vụ');
            refetchList();
          } else {
            toast.error(data?.message);
          }
          setLoadingBtn(undefined);
        },
        onError: (data) => {
          toast.error(data?.message || 'Something went wrong');
          setLoadingBtn(undefined);
        },
      }
    );
  }

  if (item?.type === 'follow') {
    const disableBtn =
      item?.is_completed ||
      (loadingBtn?.id && (loadingBtn?.id !== item?.id || loadingBtn?.key !== item?.info?.[0]?.key));
    return (
      <div className="flex items-center flex-1 ml-4 gap-2 h-[46px]">
        <p>
          {item?.required == 1 && <span className="text-2xl text-red-600">* </span>}
          Follow{' '}
          <a target="_blank" href={`https://twitter.com/${item?.target}`} className="no-underline text-sky-500">
            @{item?.target}
          </a>
        </p>
        {item?.is_completed ? (
          <img src="/imgs/icon-tick.svg" className="w-[32px] h-[32px] ml-auto" />
        ) : (
          <Button
            loading={loadingBtn?.id === item?.id && loadingBtn?.key === item?.info?.[0]?.key}
            disabled={disableBtn}
            className="ml-auto"
            onClick={() => {
              verifyMission(item?.id, item?.info?.[0]?.key);
            }}
          >
            {'Xác thực'}
          </Button>
        )}
      </div>
    );
  } else if (item?.type === 'engagement') {
    return (
      <div className="flex flex-col flex-1 ml-4 gap-2">
        <span className="leading-[46px]">
          {' '}
          {item?.required == 1 && <span className="text-2xl text-red-600">* </span>} Follow chéo
        </span>
        {item?.info?.map?.((item2, index) => {
          const disableBtn =
            item2?.is_follow ||
            (loadingBtn?.id && (loadingBtn?.id !== item?.id || loadingBtn?.key !== item?.info?.[index]?.key));
          return (
            <div className="flex items-center gap-[6px]" key={item2?.key}>
              <img src="/imgs/twitter-logo.png" className="w-[46px] h-[46px] rounded-full" />
              <p className="ml-4">
                Follow chéo{' '}
                <a href={`https://twitter.com/${item2?.follow}`} className="no-underline text-sky-500" target="_blank">
                  @{item2?.follow}
                </a>
              </p>

              {item2?.is_follow ? (
                <img src="/imgs/icon-tick.svg" className="w-[32px] h-[32px] ml-auto" />
              ) : (
                <Button
                  loading={loadingBtn?.id === item?.id && loadingBtn?.key === item?.info?.[index]?.key}
                  disabled={disableBtn}
                  className="ml-auto"
                  onClick={() => {
                    verifyMission(item?.id, item?.info?.[index]?.key);
                  }}
                >
                  {item2?.is_follow ? 'Hoàn thành' : 'Xác thực'}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    );
  } else if (item?.type === 'ads_interact') {
    const disableBtn =
      item?.is_completed ||
      (loadingBtn?.id && (loadingBtn?.id !== item?.id || loadingBtn?.key !== item?.info?.[0]?.key));
    return (
      <div className="flex items-center flex-1 ml-4 gap-2 h-[46px]">
        <p>
          {' '}
          {item?.required == 1 && <span className="text-2xl text-red-600">* </span>}
          Tương tác với quảng cáo trên tường{' '}
          <a target="_blank" href={`https://twitter.com/${item?.target}`} className="no-underline text-sky-500">
            @{item?.target}
          </a>
        </p>
        {item?.is_completed ? (
          <img src="/imgs/icon-tick.svg" className="w-[32px] h-[32px] ml-auto" />
        ) : (
          <Button
            loading={loadingBtn?.id === item?.id && loadingBtn?.key === item?.info?.[0]?.key}
            disabled={disableBtn}
            className="ml-auto"
            onClick={() => {
              verifyMission(item?.id, item?.info?.[0]?.key);
            }}
          >
            {'Xác thực'}
          </Button>
        )}
      </div>
    );
  } else if (item?.type === 'post_engagement') {
    return (
      <div className="flex flex-col flex-1 ml-4 gap-2">
        <span className="leading-[46px]">
          {item?.required == 1 && <span className="text-2xl text-red-600">* </span>}
          Tương tác bài viết{' '}
          <a target="_blank" href={`https://twitter.com/${item?.target}`} className="no-underline text-sky-500">
            bài viết
          </a>
        </span>
        {item?.info?.map?.((item2, index) => {
          const disableBtn =
            item2?.is_follow ||
            (loadingBtn?.id && (loadingBtn?.id !== item?.id || loadingBtn?.key !== item?.info?.[index]?.key));
          return (
            <div className="flex items-center gap-[6px]" key={item2?.key}>
              <img src="/imgs/twitter-logo.png" className="w-[46px] h-[46px] rounded-full" />
              <p className="ml-4">{titleCase(item2?.key)}</p>

              {item2?.is_follow ? (
                <img src="/imgs/icon-tick.svg" className="w-[32px] h-[32px] ml-auto" />
              ) : (
                <Button
                  loading={loadingBtn?.id === item?.id && loadingBtn?.key === item?.info?.[index]?.key}
                  disabled={disableBtn}
                  className="ml-auto"
                  onClick={() => {
                    verifyMission(item?.id, item?.info?.[index]?.key);
                  }}
                >
                  {item2?.is_follow ? 'Hoàn thành' : 'Xác thực'}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>MissionItem</div>;
  }
};

export default MissionItem;
