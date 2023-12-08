import { Button } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import Container from '~/components/base/Container';

export default function Header() {
  const { data, status } = useSession();
  // console.log({ data })
  if (status === 'authenticated') {
    return (
      <header className="pt-6">
        <Container className="border-[2px] border-solid border-[#000] rounded-xl px-6 py-4 flex items-center">
          <img src={data?.user?.data?.profile_image_url} className="rounded-full w-[55px] h-[55px]" />
          <div className="flex flex-col ml-4">
            <span className="text-[20px] font-bold">{data?.user?.data?.name}</span>
            <span className="text-[14px]">@{data?.user?.data?.username}</span>
          </div>
          <Button
            className="ml-auto"
            onClick={() => {
              signOut();
            }}
          >
            Đăng xuất
          </Button>
        </Container>
      </header>
    );
  } else {
    return <></>;
  }
}
