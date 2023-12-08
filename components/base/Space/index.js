export default function Space({ height = 0, width = 0 }) {
  return (
    <div
      style={{
        position: 'relative',
        height: height,
        width: width,
      }}
    ></div>
  );
}
