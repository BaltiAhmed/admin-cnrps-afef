import { useState, useCallback, useEffect } from "react";



export const UserAuth = () => {
  const [token, setToken] = useState(false);
  const [user, setUser] = useState(false);
  const [type, setType] = useState("");

  const login = useCallback((user, token, type) => {
    setToken(token);
    setUser(user);
    setType(type)

    localStorage.setItem(
      "userData",
      JSON.stringify({
        user: user,
        token: token,
        type: type
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setType("")
    localStorage.removeItem("userData");
  }, []);



  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token 
    ) {
      login(
        storedData.user,
        storedData.token,
        storedData.type
      );
    }
  }, [login]);

  return { token, login, logout, user };
};
