import styles from './styles.module.scss';

export default function InputSelect({ register, ...props }) {
  return (
    <select className={styles['select']} {...register(props?.name)}>
      {props?.options?.map((item, index) => {
        return (
          <option value={item?.value} key={index} defaultValue={item?.defaultValue}>
            {item?.label}
          </option>
        );
      })}
    </select>
  );
}
