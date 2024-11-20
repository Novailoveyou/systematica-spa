import { ReactNode } from 'react';

const BaseOverlay = ({ children }: { children: ReactNode }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center z-50'>
      <div className='flex flex-col items-center space-y-4'>{children}</div>
    </div>
  );
};

export default BaseOverlay;
