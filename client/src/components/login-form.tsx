import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "..";

const SearchInputDiv = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
 
`;

const InputElem = styled.input`
    display: flex;
  /* width: 50%; */
  height: 45px;
  margin-top: 20px;
  :first-of-type {
    margin-top: 10px;
  }
  padding-left: 45px;
  font-family: "Balsamiq Sans";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #f4f4f4;
  border: 1px solid #1a9920;
  border-radius: 30px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: 0.5s padding-left;
  &:focus {
    padding-left: 65px;
  }
`

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { store } = useContext(Context);
    return (
        <div>
            <InputElem
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputElem
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => store.login(email, password)}>Login</button>
            <button onClick={() => store.registration(email, password)}>
                Registration
            </button>
        </div>
    );
};

export default observer(LoginForm)