import { Chart, Table } from './components';
import './globals.css';
import { useDistricts } from './hooks';
import { LoadingOverlay, ErrorOverlay } from './components/overlay';

function App() {
  const { districts, loading, error } = useDistricts();

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorOverlay />;
  }

  return (
    <main>
      <h1 className='text-3xl text-center py-6'>
        Велосипедные парковки Москвы
      </h1>
      <div className='flex flex-col-reverse md:flex-row'>
        <div className='basis-3/6'>
          <Chart districts={districts} />
        </div>
        <div className='basis-5/6'>
          <Table districts={districts} />
        </div>
      </div>
    </main>
  );
}

export default App;
