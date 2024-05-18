import { BrowserRouter , Route, Routes, Navigate} from "react-router-dom";
import { AppShell } from '@mantine/core';
import AdDetailPage from "./components/pages/adDetailPage/AdDetailPage.jsx";
import UpdateAdPage from "./components/pages/updateAdPage/UpdateAdPage.jsx";
import MainPage from "./components/pages/mainPage/MainPage.jsx";
import CreateAd from "./components/pages/updateAdPage/updateAdPageSub/CreateAd.jsx";
import Verify from "./components/pages/updateAdPage/updateAdPageSub/Verify.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import Header from "./components/Header.jsx";
import Navigation from "./components/Navigation.jsx";

import "@mantine/core/styles.css";
import './App.css'



export default function App() {
  
  return (
    <BrowserRouter>
      <AppShell 
        header={{ height: 150 }}
        padding="lg"
      >

        <AppShell.Header>
          <Navigation />
          <Header />
        </AppShell.Header>

        <AppShell.Main>
          <Routes>
            <Route index path="/" element={<MainPage />} />
            <Route index path="/ads" element={<MainPage />} />
            <Route path="ads/:id" element={<AdDetailPage />}></Route>
            <Route path="update" element={<UpdateAdPage />}>
              <Route index element={<Navigate replace to="create"/>} />
              <Route path="create" element={<CreateAd />} />
              <Route path="verify" element={<Verify/>} />
            </Route>
            
            {/*
             /create - route: Redirecting when ad changed or updated to mainpage 
             / when successfully updated: set state to success = true
             // false: display error alert
             <Route path="/redirect" element={success && <Navigate to="/"/>} />
             */}
             <Route path="/redirect" element={<Navigate to="/"/>} />
             <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </AppShell.Main>
      </AppShell>
    </BrowserRouter>
  )
}


