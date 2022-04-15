import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/authResponse";
import AuthService from "../services/auth-service";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }
  setAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setUser(user: IUser) {
    this.user = user;
  }
  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response, "response");
      localStorage.setItem("token", response.data.accessToken);
      this.setUser(response.data.user);
      this.setAuth(true);
    } catch (error: any) {
      console.log(error.response?.data?.message);
      console.log(error);
    }
  }
  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response, "response");
      localStorage.setItem("token", response.data.accessToken);
      this.setUser(response.data.user);
      this.setAuth(true);
    } catch (error: any) {
      console.log(error.response?.data?.message);
      console.log(error);
    }
  }
  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response, "response");
      localStorage.removeItem("token");
      this.setUser({} as IUser);
      this.setAuth(false);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      }); // Дженерик перед функцией значит тело ответа
      console.log(response, "respsp");
      //   console.log(response.then((res) => console.log(res)));

      localStorage.setItem("token", response.data.accessToken);
      this.setUser(response.data.user);
      this.setAuth(true);
    } catch (error: any) {
      console.log(error.response?.data?.message);
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  }
}
