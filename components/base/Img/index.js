import dynamic from 'next/dynamic';

function Img({ errorImage = '', src = '', ...props }) {
  const imageBase = '/imgs/avatar.png';
  return (
    <img
      {...props}
      src={src || errorImage || imageBase}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = errorImage || imageBase;
      }}
    />
  );
}
export default dynamic(() => Promise.resolve(Img), {
  ssr: false,
});
