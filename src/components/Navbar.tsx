import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <nav className=''>
        <ul className='h-14 flex flex-row justify-center items-center'>
          <li className='px-6'>
            <Link to='/'>Home</Link>
          </li>
          <li className='px-6'>
            <Link to='/quiz'>Quiz</Link>
          </li>
          <li className='px-6'>
            <Link to='/scoreboard'>Scoreboard</Link>
          </li>
          <li className='px-6'>
            <Link to='/setup'>Setup</Link>
          </li>
        </ul>
      </nav>

      <hr />
    </>
  );
}

export default Navbar;
