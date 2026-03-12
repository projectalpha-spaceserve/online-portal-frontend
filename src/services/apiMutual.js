import axios from "axios";
import { baseUrl, cleanToken } from "../constants/helper";

export async function getMutualProducts(token) {
  try {
    const response = await axios.get(`${baseUrl}/products`, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch mutual products",
    );
  }
}

export async function createMutual(token, data) {
  try {
    const response = await axios.post(
      `${baseUrl}/products/mutual-funds/create`,
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
      error.response?.data?.message || "Failed to create mutual fund",
    );
  }
}

export async function getActiveMutuals(token) {
  try {
    const response = await axios.get(`${baseUrl}/products/mutual-funds`, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch mutual products",
    );
  }
}

export async function getActiveMutual(token, id) {
  try {
    const response = await axios.get(`${baseUrl}/products/mutual-funds/${id}`, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch mutual funds product",
    );
  }
}

export async function liquidateMutual(token, data) {
  try {
    const response = await axios.post(
      `${baseUrl}/products/mutual-funds/liquidate`,
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
      error.response?.data?.message || "Failed to liquate investment",
    );
  }
}

export async function getMutualStatement(token, data) {
  try {
    const response = await axios.post(
      `${baseUrl}/products/mutual-funds/statement`,
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
      error.response?.data?.message || "Failed to fetch mutual statement",
    );
  }
}
