import axios from "axios";
import { baseUrl, cleanToken } from "../constants/helper";

export async function getTrustProducts(token) {
  try {
    const response = await axios.get(`${baseUrl}/trust`, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch trust products",
    );
  }
}

export async function createTrust(token, data) {
  try {
    const response = await axios.post(`${baseUrl}/trust/create`, data, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to create trust");
  }
}

export async function topupTrust(token, data) {
  try {
    const response = await axios.post(`${baseUrl}/trust/topup`, data, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to topup investment",
    );
  }
}

export async function getActiveTrusts(token) {
  try {
    const response = await axios.get(`${baseUrl}/trust/my`, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch active trusts",
    );
  }
}

export async function portfolioSummary(token, id) {
  try {
    const response = await axios.get(
      `${baseUrl}/trust/portfolio/summary?customer_id=${id}`,
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
      error.response?.data?.message || "Failed to fetch placements",
    );
  }
}

export async function liquidateTrust(token, data) {
  try {
    const response = await axios.post(`${baseUrl}/trust/liquidate`, data, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to liquate investment",
    );
  }
}
