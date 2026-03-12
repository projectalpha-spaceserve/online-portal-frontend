import axios from "axios";
import { baseUrl, cleanToken } from "../constants/helper";

export async function getProfile(token) {
  const cleanToken = token.replace(/^"|"$/g, "");
  const response = await fetch(`${baseUrl}/auth/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cleanToken}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Fetching user failed");
  }
  return response.json();
}

export async function getProfileDashboard(token) {
  try {
    const response = await axios.get(`${baseUrl}/auth/profile/dashboard`, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch profile dashboard",
    );
  }
}

export async function getSecurityQuestions(token) {
  try {
    const response = await axios.get(
      `${baseUrl}/auth/profile/security-questions`,
      {
        headers: {
          Authorization: `Bearer ${cleanToken(token)}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch security questions",
    );
  }
}

export async function createSecurityQuestion(token, data) {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/profile/security-questions`,
      data,
      {
        headers: {
          Authorization: `Bearer ${cleanToken(token)}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to create security question",
    );
  }
}
export async function complaints(token, data) {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/profile/submit-complaints`,
      data,
      {
        headers: {
          Authorization: `Bearer ${cleanToken(token)}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to submit complaints",
    );
  }
}
export async function switchAccounts(token, data) {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/profile/switch-accounts`,
      data,
      {
        headers: {
          Authorization: `Bearer ${cleanToken(token)}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to submit complaints",
    );
  }
}
export async function updatePassword(token, data) {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/profile/update-password`,
      data,
      {
        headers: {
          Authorization: `Bearer ${cleanToken(token)}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to update password",
    );
  }
}

export async function getLinkedAccounts(token) {
  try {
    const response = await axios.get(
      `${baseUrl}/auth/profile/linked-accounts`,
      {
        headers: {
          Authorization: `Bearer ${cleanToken(token)}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch security questions",
    );
  }
}
export async function transactions(token) {
  try {
    const response = await axios.get(`${baseUrl}/auth/profile/transactions`, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch transactions",
    );
  }
}
