const { useState, useEffect } = require('react');
import baseCss from '~/public/styles/base.module.scss';
import { handleWidthCss } from '~/utils/base';

export default function useResize() {
  const [device, setDevice] = useState('medium');
  const [width, setWidth] = useState(10000);
  function resizeDevice() {
    const large = handleWidthCss(baseCss?.largeDevice);
    const medium = handleWidthCss(baseCss?.mediumDevice);
    const small = handleWidthCss(baseCss?.smallDevice);
    setWidth(window.innerWidth);
    if (typeof window != 'undefined') {
      let value = '';
      if (window.innerWidth >= large) {
        value = 'large';
      } else if (window.innerWidth >= medium && window.innerWidth < large) {
        value = 'medium';
      } else if (window.innerWidth >= small && window.innerWidth < medium) {
        value = 'small';
      } else if (window.innerWidth < small) {
        value = 'extra-small';
      }
      setDevice(value);
    }
  }
  useEffect(() => {
    resizeDevice();
    window.addEventListener('resize', resizeDevice);
    return () => {
      window.removeEventListener('resize', resizeDevice);
    };
  }, []);
  return { device, width };
}
