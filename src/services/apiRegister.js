import axios from "axios";
import { baseUrl } from "../constants/helper";

export async function verifyNewCustomerEmail(data) {
  try {
    const response = await axios.post(
      `${baseUrl}/new-customer/verify-email`,
      data,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || "Failed to verify new customer email",
    );
  }
}
export async function verifyNewCustomerOtp(data) {
  try {
    const response = await axios.post(
      `${baseUrl}/new-customer/verify-otp`,
      data,
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || "Failed to verify new customer OTP",
    );
  }
}

export async function registerNewCustomer(data) {
  try {
    const response = await axios.post(`${baseUrl}/new-customer/register`, data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || "Failed to register new customer",
    );
  }
}
export async function existingCustomerLinkedAccount(data) {
  try {
    const response = await axios.post(
      `${baseUrl}/existing-customer/get-linked-accounts`,
      data,
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Failed to fetch account");
  }
}
export async function verifyExistingCustomerEmail(data) {
  try {
    const response = await axios.post(
      `${baseUrl}/existing-customer/verify-email`,
      data,
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response?.data?.message ||
        "Failed to verify existing customer email",
    );
  }
}
export async function verifyExistingCustomerOtp(data) {
  try {
    const response = await axios.post(
      `${baseUrl}/existing-customer/verify-otp`,
      data,
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || "Failed to verify existing customer OTP",
    );
  }
}

export async function registerExistingCustomer(data) {
  try {
    const response = await axios.post(
      `${baseUrl}/existing-customer/register`,
      data,
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || "Failed to register new customer",
    );
  }
}
