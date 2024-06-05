import { useState, useEffect } from 'react';


export function useFetchAdById(id) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [ad, setAd] = useState("");

    useEffect(function() {
        const controller = new AbortController();
        async function fetchAdByID() {
          try {
            setIsLoading(true);
            setErrorMessage("");
          
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/adverts/${id}`, {signal: controller.signal});
            if(!res.ok) throw new Error("Etwas ist schiefgelaufen beim Laden des Inserats");
            const data = await res.json();
            if(!data.data.ad) throw new Error("Kein Inserat gefunden")
            setAd(data.data.ad)
          } catch (err) {
            if (err.name !== "AbortError") {
              console.log(err.message);
              setErrorMessage(err.message);
            } 
          } finally {
            setIsLoading(false);
          }
        }
        fetchAdByID();
  
      }, [id])

    return { ad, isLoading, errorMessage }
}