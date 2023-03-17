import { Outlet } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
      <div>
        <h1>I am the navigation bar</h1>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation;