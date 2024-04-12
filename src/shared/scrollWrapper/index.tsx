import { ComponentType, useEffect } from 'react';

const withScrollLock = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    useEffect(() => {
      // Запретить прокрутку страницы при монтировании компонента
      document.body.style.overflow = 'hidden';
      return () => {
        // Разрешить прокрутку страницы при размонтировании компонента
        document.body.style.overflow = 'auto';
      };
    }, []);

    // Рендерим обернутый компонент и передаем ему все пропсы
    return <WrappedComponent {...props} />;
  };
};

export default withScrollLock;