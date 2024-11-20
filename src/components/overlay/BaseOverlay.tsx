import { ComponentProps } from 'react';

const BaseOverlay = ({ children }: Pick<ComponentProps<'div'>, 'children'>) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center z-50'>
      <div className='flex flex-col items-center space-y-4'>{children}</div>
    </div>
  );
};

export default BaseOverlay;
