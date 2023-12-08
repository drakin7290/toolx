export default function InputText({ register, ...props }) {
  return <input {...props} {...register(props?.name)} />;
}
