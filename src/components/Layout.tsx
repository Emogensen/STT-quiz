import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <>
      <Navbar />
      <div className='flex justify-center my-10 mx-6'>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
