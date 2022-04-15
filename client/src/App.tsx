import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from ".";
import "./App.css";
import LoginForm from "./components/login-form";
import { IUser } from "./models/IUser";
import userService from "./services/user-service";

const LoginFormDiv = styled.div`
    width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    console.log("starttt");
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await userService.fetchUsers();
      setUsers(response.data);
      console.log("start", users);
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return <div>Zagruzka...</div>;
  }

  if (!store.isAuth) {
    return (
      <LoginFormDiv>
        <LoginForm />
        <button onClick={getUsers}>Get users</button>
      </LoginFormDiv>
    );
  }
  return (
    <div className="App">
      <h1>{store.isAuth ? `Logged ${store.user.email}` : "Unauthorized"}</h1>
      <h1>{store.user.isActivated ? "Accout active" : "Activate account!"}</h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getUsers}>Get users</button>
      </div>
      {users.map((user) => {
        console.log(user);
        return (<div key={user.email}>{user.email}</div>)
      })}
    </div>
  );
};

export default observer(App);
