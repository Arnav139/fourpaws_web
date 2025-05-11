import { User } from "@/types/user";
import ApiClient from "./api";

const api = new ApiClient(process.env.NEXT_PUBLIC_PROD_URL!);

export const userService = {
  sendOtp: async (email: string) => {
    return await api.post<{ token: string }>("/auth/login", { email });
  },

  verifyOtp: async (otp: string, otpToken: string) => {
    return await api.post<{ user: User }>(
      "/auth/verify-otp",
      { otp },
      {
        Authorization: `Bearer ${otpToken}`,
      },
    );
  },

  getUser: async (token: string) => {
    return await api.get<{ user: User }>("/user/profile", {
      Authorization: `Bearer ${token}`,
    });
  },
};
