import { useEffect, useState } from 'react';
import axios from 'axios';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated,setAuthenticated] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user`, { withCredentials: true })
      .then(res => {
        if (res.data.authenticated) {
          setUser(res.data.user);
          setAuthenticated(true);
        } else {
          setUser(null);
          setAuthenticated(false);

        }
      })
      .catch(err => {
        setUser(null);
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  

  return { user, loading,authenticated };
}
