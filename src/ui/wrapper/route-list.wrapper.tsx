import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

export function RouteListWrapper() {
  return (
    <>
      <Helmet>
        <title>Routes | Go Wild</title>
      </Helmet>

      <Outlet />
    </>
  );
}
