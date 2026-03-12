import axios from "axios";
import { baseUrl, cleanToken } from "../constants/helper";

export async function getIdentity(token) {
  try {
    const response = await axios.get(`${baseUrl}/GetIdentity`, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch identity information",
    );
  }
}
export async function getRelation(token) {
  try {
    const response = await axios.get(`${baseUrl}/GetRelation`, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch relation information",
    );
  }
}
export async function getState(token) {
  try {
    const response = await axios.get(`${baseUrl}/GetState`, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch state information",
    );
  }
}
export async function getTitle(token) {
  try {
    const response = await axios.get(`${baseUrl}/GetTitle`, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch title information",
    );
  }
}
export async function getBanks(token) {
  try {
    const response = await axios.get(`${baseUrl}/GetBanks`, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch banks information",
    );
  }
}
export async function getLga(token) {
  try {
    const response = await axios.get(`${baseUrl}/GetLga`, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch LGA information",
    );
  }
}
