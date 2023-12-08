import { useContext } from 'react';
import { TransContext } from './TransProvider';

const useTrans = () => {
  const trans = useContext(TransContext);
  return trans;
};

export default useTrans;
