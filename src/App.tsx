import Providers from '@/app/providers';
import AppRoutes from '@/routes/AppRoutes';
import '@/styles/tailwind.css';
// import { Routes, Route, useLocation, useEffect } from 'react-router-dom';
export default function App() {
    // const location = useLocation();
  
  // useEffect(() => {
  //   console.log("📍 Route changed:", location.pathname);
  // }, [location.pathname]);
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}
