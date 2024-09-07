import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CityList from "./components/city/CityList";
import CountryList from "./components/country/CountryList";
import City from "./components/city/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import Homepage from "./pages/Homepage";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const Homepage = lazy(() => import('./pages/Homepage'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage/>}>
              <Routes>
              <Route path="/" element={<Homepage/>}/>

              <Route path="app" element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
                <Route index element={<Navigate replace to="cities"/>}/>
                <Route path="cities" element={<CityList/>}/>
                <Route path="cities/:id" element={<City/>}/>
                <Route path="countries" element={<CountryList/>}/>
                <Route path="form" element={<Form/>}/>
              </Route>

              <Route path="pricing" element={<Pricing/>}/>
              <Route path="product" element={<Product/>}/>
                <Route path="login" element={<Login/>}/>
              <Route path="*" element={<PageNotFound/>}/>
            </Routes>
            </Suspense>
          </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;