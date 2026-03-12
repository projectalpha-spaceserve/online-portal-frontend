import axios from "axios";
import { baseUrl } from "../constants/helper";

export async function login(formData) {
  try {
    const response = await axios.post(`${baseUrl}/auth`, formData);

    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to login account");
  }
}

export async function verifyOtp(formData) {
  try {
    const response = await axios.post(`${baseUrl}/auth/verify-otp`, formData);

    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to verify OTP");
  }
}

export async function resetPassword(formData) {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/reset-password`,
      formData,
    );

    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to verify email");
  }
}

export async function verifyToken(formData) {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/verify-token/`,
      formData,
    );

    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to verify OTP");
  }
}
export async function updatePassword(formData) {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/update-password/`,
      formData,
    );

    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to update password.",
    );
  }
}

export async function register(formData) {
  try {
    const response = await axios.post(`${baseUrl}/online/register/`, formData);

    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to register account",
    );
  }
}
