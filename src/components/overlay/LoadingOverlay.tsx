import BaseOverlay from './BaseOverlay';

const LoadingOverlay = () => {
  return (
    <BaseOverlay>
      <div className='animate-spin rounded-full h-24 w-24 border-4 border-t-4 border-gray-200 border-t-blue-500'></div>
      <p className='text-lg'>Данные загружаются...</p>
    </BaseOverlay>
  );
};

export default LoadingOverlay;
