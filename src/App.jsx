import { useState, useEffect } from 'react';
import { BrowserRouter , Route, Routes, Navigate, Link, useNavigate} from "react-router-dom";
import { AppShell, Space, Group, Text, Button, Notification } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import socket from "./socket.js"

import AdDetailPage from "./components/pages/adDetailPage/AdDetailPage.jsx";
import UpdateAdPage from "./components/pages/updateAdPage/UpdateAdPage.jsx";
import MainPage from "./components/pages/mainPage/MainPage.jsx";
import Navigation from "./components/Navigation.jsx";
import CreateAd from "./components/pages/updateAdPage/updateAdPageSub/CreateAd.jsx";
import Verify from "./components/pages/updateAdPage/updateAdPageSub/Verify.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import './App.css'
import NotificationLinks from './components/NotificationLinks.jsx';
import Footer from './components/Footer.jsx';



export default function App() {
  const [navigateId, setNavigateId] = useState("");


  useEffect(() => {
    // gets text from backend - here we have access to display it
    function onUpdated(ad) {
      notifications.show({
        title: `${ad.name} hat soeben sein Inserat geändert.`,
        message: <><Text pb="20">Hier kannst du es dir anschauen:</Text><Button size="xs" variant="filled" onClick={() => {setNavigateId(ad._id), notifications.hide(`${ad._id}`)}}>Inserat Anschauen</Button></>,
        autoClose: 7000,
        withCloseButton: true,
        id:`${ad._Id}`,
        color: "var(--mantine-color-blue-6	)",
        style: { background: "var(--mantine-color-dark-6)" },
      })
    }

    function onCreated(ad) {
      console.log(ad);
      notifications.show({
        title: `${ad.name} hat soeben ein Inserat erstellt.`,
        message: <><Text pb="20">Hier kannst du es dir anschauen:</Text><Button size="xs" variant="filled" onClick={() => {setNavigateId(ad._id), notifications.hide(`${ad._id}`)}}>Inserat Anschauen</Button></>,
        autoClose: 7000,
        withCloseButton: true,
        id:`${ad._Id}`,
        color: "var(--mantine-color-blue-6	)",
        style: { background: "var(--mantine-color-dark-6)" },
      })
    }
    socket.connect();
      
    socket.on("updated", onUpdated)
    socket.on("created", onCreated)

    return () => {
      socket.off("updated", onUpdated)
      socket.off("created", onCreated)
    }
  }, []);


  
  return (
    <BrowserRouter>
    {navigateId && <NotificationLinks navigateId={navigateId} setNavigateId={setNavigateId}/>}
    
      <AppShell 
        header={{ height: 68 }}
        padding="xl"
      >

        <AppShell.Header style={{background: "radial-gradient(circle, var(--mantine-color-cyan-9) 4%, var(--mantine-color-blue-9) 100%)"}}>
          <Navigation />
        </AppShell.Header>

        <Space h="xl"></Space>
        <Space h="xl"></Space>
        <Space h="xl"></Space>

        <AppShell.Main pb="180">
       {/* <Notification></Notification> */}
       <Routes>
            <Route index path="/" element={<MainPage />} />
            <Route index path="/ads" element={<MainPage />} />
            <Route path="ads/:id" element={<AdDetailPage />}/>
            <Route path="update" element={<UpdateAdPage />}>
             <Route index element={<Navigate replace to="create"/>} />
              <Route path="create" element={<CreateAd />} />
              <Route path="verify" element={<Verify/>} />
            </Route>
            
             <Route path="/redirect" element={<Navigate to="/"/>} />
             <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </AppShell.Main >
        <AppShell.Footer bg="var(--mantine-color-dark-8)" style={{position: "static"}}withBorder={true}><Footer></Footer></AppShell.Footer>
      </AppShell>
    </BrowserRouter>
    
  )
}


