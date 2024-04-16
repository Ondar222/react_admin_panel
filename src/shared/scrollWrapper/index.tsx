import { ComponentType, useEffect } from 'react';

const withScrollLock = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, []);
    return <WrappedComponent {...props} />;
  };
};

export default withScrollLock;