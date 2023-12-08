import clsx from 'clsx';
import styles from './styles.module.scss';
export default function InputNumber({ register, className, type, ...props }) {
  return (
    <input className={clsx(styles['input-number'], className)} type={'number'} {...props} {...register(props?.name)} />
  );
}
