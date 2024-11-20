import BaseOverlay from './BaseOverlay';
import warningIcon from '../../assets/warning.svg';

const ErrorOverlay = () => {
  return (
    <BaseOverlay>
      <img src={warningIcon} className='h-24 w-24'></img>
      <p className='text-lg'>Во время загрузки данных возникла ошибка:(</p>
    </BaseOverlay>
  );
};

export default ErrorOverlay;
