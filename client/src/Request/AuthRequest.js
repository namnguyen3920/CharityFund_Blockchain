import AxiosHelper from "./AxiosHelper";

class AuthRequest {
  registerUser(user) {
    const url = "/auth/register";
    return AxiosHelper.post(url, user);
  }
  loginUser(user) {
    const url = "/auth/login";
    return AxiosHelper.post(url, user);
  }
}

export default new AuthRequest();
