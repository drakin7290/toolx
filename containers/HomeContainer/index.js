import { Button, Input, Modal } from 'antd';
import clsx from 'clsx';
import moment from 'moment/moment';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Container from '~/components/base/Container';
import CountDown from '~/components/common/CountDown';
import MissionItem from '~/components/common/MissionItem';
import { useGetListGroup, usePostExit, usePostJoin } from '~/hooks/api/useGroup';
import { useGetListMission } from '~/hooks/api/useMission';

function HomeContainer() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data, refetch, isFetching } = useGetListGroup();
  const { mutate, isLoading } = usePostJoin();
  const { mutate: mutateExit, isLoading: isLoadingExit } = usePostExit();
  const [code, setCode] = useState('');
  const [open, setOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState({});
  const [valueLinkStatus, setValueLinkStatus] = useState('');

  const { data: listMission, refetch: refetchListMission, isFetching: isFetchingListMission } = useGetListMission();

  const [userIsJoined, setUserIsJoined] = useState(false);
  const [listMissionCompleted, setListMissionCompleted] = useState(false);
  const [listRequiredMissionCompleted, setListRequiredMissionCompleted] = useState(false);

  useEffect(() => {
    const joined_room = data?.data?.filter((item) => item?.is_joined);
    const is_joined = joined_room?.length > 0;
    refetchListMission();
    setUserIsJoined(is_joined);
    if (is_joined) {
      setActiveRoom(joined_room[0]);
    }
  }, [data]);

  useEffect(() => {
    // const is_completed =
    //   listMission?.data?.missions?.filter((item) => item?.is_completed)?.length === listMission?.data?.missions?.length;

    let can_outroom = true;
    listMission?.data?.missions?.forEach((item) => {
      if (!item?.is_completed && item?.required) {
        can_outroom = false;
      }
    });
    setListMissionCompleted(can_outroom);

    const is_completed_required =
      listMission?.data?.missions?.filter((item) => item?.is_completed && item?.required)?.length ===
      listMission?.data?.missions?.filter((item) => item?.required)?.length;
    setListRequiredMissionCompleted(is_completed_required);
  }, [listMission]);
  console.log({ listMission });

  const showModal = () => {
    setOpen(true);
  };

  function join(id) {
    mutate(
      {
        code: id,
        ads: 'ads',
      },
      {
        onSuccess: (data) => {
          if (!data?.error) {
            toast.success('Tham gia thành công!');
            refetch();
          } else {
            toast.error(data?.message);
            router.reload();
          }
        },
        onError: (error) => {
          toast.error('Có lỗi gì đó xảy ra!');
        },
      }
    );
    // setValueLinkStatus('')
    // setOpen(false)
  }

  function exit(id) {
    mutateExit(
      {
        code: id,
      },
      {
        onSuccess: (data) => {
          if (!data?.error) {
            toast.success('Thoát thành công!');
            refetch();
          } else {
            toast.error(data?.message);
          }
        },
        onError: (error) => {
          toast.error('Có lỗi gì đó xảy ra!');
        },
      }
    );
  }

  return (
    <Container>
      {userIsJoined ? (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-[24px] font-bold uppercase mt-[24px]">
              Danh sách nhiệm vụ của nhóm: {listMission?.data?.name}
            </h1>

            <Button
              disabled={!listMissionCompleted}
              onClick={() => {
                exit(activeRoom?.code);
              }}
            >
              Rời phòng
            </Button>
          </div>

          {isFetchingListMission ? (
            'Đang tải nhiệm vụ...'
          ) : (
            <div className="flex flex-col gap-3 mt-6">
              {listMission?.data?.missions?.length > 0 ? (
                <div>
                  <CountDown listMission={listMission?.data} userIsJoined={userIsJoined} />
                  <div className="flex flex-col gap-3 mt-6">
                    {listMission?.data?.missions?.map((item, index) => {
                      return (
                        <div
                          key={item?.id}
                          className={clsx('flex items-start', {
                            ['opacity-10 pointer-events-none select-none']:
                              !item?.required && !listRequiredMissionCompleted,
                          })}
                        >
                          <span className="text-[18px] font-bold w-[24px] leading-[46px] flex">{index + 1}</span>
                          <img src="/imgs/twitter-logo.png" className="w-[46px] h-[46px] rounded-full" />
                          <MissionItem item={item} refetchList={refetchListMission} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p>Room này chưa bắt đầu làm nhiệm vụ</p>
              )}
            </div>
          )}
        </>
      ) : session?.user?.response?.data?.flags >= 3 ? (
        <h1 className="font-bold text-[24px] mt-[24px] text-red-600">Bạn đã bị ban</h1>
      ) : (
        <>
          {/* <Modal
          title="Join"
          open={open}
          onOk={() => {
            join(activeRoom.code)
          }}
          destroyOnClose={true}
          onCancel={() => {
            setOpen(false)
          }}
          okText="Join"
        >
          Nhập link bài viết trên X mà bạn muốn mọi người tương tác:
          <Input placeholder="Enter X link for post..." className="mt-[12px]" value={valueLinkStatus} onChange={(e) => {
            setValueLinkStatus(e.currentTarget.value)
          }} />
        </Modal> */}
          {session?.user?.response?.data?.flags >= 1 && (
            <h1 className="font-bold text-[24px] mt-[24px] text-red-600">
              Bạn bị cảnh báo lần {session?.user?.response?.data?.flags} do không hoàn thành nhiệm vụ!
            </h1>
          )}
          <h1 className="font-bold text-[24px] mt-[24px]">Danh sách nhóm</h1>
          <div className="grid grid-cols-4 gap-4 mt-6">
            {isFetching ? (
              <p className="text-black text-[50px] text-center">Đang tải...</p>
            ) : (
              data?.data?.map?.((item, index) => {
                const time = moment(item?.begin_mission, 'YYYY-MM-DD hh:mm:ss').fromNow();
                return (
                  <div className="rounded-[16px] border-[1px] border-solid border-[#333] p-4 flex flex-col gap-[12px]">
                    <p className="font-bold text-[16px]">
                      {item?.name} ({item?.total_member}/{item?.max_member})
                    </p>
                    <p className="text-[12px]">
                      <span className="font-bold">
                        {time.includes('trước') ? 'Nhiệm vụ đã bắt đầu vào: ' : 'Nhiệm vụ sẽ bắt đầu lúc: '}
                      </span>
                      {time}
                    </p>
                    <Button
                      className="mt-auto"
                      isLoading={(isLoading || isLoadingExit) && item?.code == code}
                      onClick={() => {
                        if (isLoading || isLoadingExit) {
                          toast.warn('Wait...');
                        } else {
                          setCode(item?.code);
                          if (item?.is_joined) {
                            exit(item?.code);
                          } else {
                            setActiveRoom(item);
                            join(item?.code);
                          }
                        }
                      }}
                    >
                      {item?.is_joined ? 'Thoát nhóm' : 'Tham gia nhóm'}
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </Container>
  );
}

export default HomeContainer;
