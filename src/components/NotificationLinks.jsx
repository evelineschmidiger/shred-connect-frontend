import { useEffect } from 'react';
import { useNavigate} from "react-router-dom";


// fake component to handle push notification links -> useNavigate can only be used in a component inside <BrowserRouter/>, not in App.jsx
function NotificationLinks({ navigateId, setNavigateId }) {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/ads/${navigateId}`);
        setNavigateId("");
      }, [navigateId, navigate, setNavigateId])

    return (
        <></>
    )
}

export default NotificationLinks
