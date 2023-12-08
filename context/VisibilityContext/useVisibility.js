import { useContext } from 'react';
import { VisibilityContext } from './VisibilityProvider';

const useVisibility = (key = '') => {
  const visibilityContext = useContext(VisibilityContext);
  const visibility = visibilityContext?.visibility;
  if (key !== '') {
    if (typeof key === 'string') {
      return visibility[key];
    } else {
      let obj = {};
      for (let i = 0; i < key?.length; i++) {
        obj = { ...obj, ...visibility[key[i]] }
      }
      return obj;
    }
  }
  return visibility;
};

export default useVisibility;

