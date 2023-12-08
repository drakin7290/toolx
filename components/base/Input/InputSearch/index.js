import clsx from 'clsx';
import { Search } from '~/public/assets/svgs';
import styles from './styles.module.scss';
export default function InputSearch(props) {
  return (
    <div className={clsx(styles['input-search'])}>
      <input {...props} />
      <Search
        width="24px"
        height="24px"
        onClick={() => {}}
        style={{
          cursor: 'pointer',
        }}
      />
    </div>
  );
}
