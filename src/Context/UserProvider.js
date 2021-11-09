import axios from "axios";
import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({ isLoggedIn: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const handleUser = {
    register: async (info) => {
      setLoading(true);
      try {
        let [newUser] = await axios.post(`/auth/register`, info);
        setUser(newUser.data);
      } catch (err) {
        setError(err.message.data);
      } finally {
        setLoading(false);
      }
    },
    login: async (info) => {
      setLoading(true);
      try {
        let loggedUser = await axios
          .post(`/auth/login`, info)
          .then((res) => res.data);

        setUser(loggedUser);
      } catch (err) {
        setError(err.message.data);
      } finally {
        setLoading(false);
      }
    },
    logout: () => {
      setLoading(true);
      try {
          axios.delete(`/auth/logout`);
          setUser({ isLoggedIn: false });
      } catch (err) {
        setError(err.message.data);
      } finally {
        setLoading(false);
      }
    },
    setUser,
  };
  return (
    <UserContext.Provider value={[user, { handleUser, loading, error }]}>
      {props.children}
    </UserContext.Provider>
  );
};
