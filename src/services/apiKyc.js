import axios from "axios";
import { baseUrl, cleanToken } from "../constants/helper";

export async function getKycStatus(token) {
  try {
    const response = await axios.get(`${baseUrl}/kyc/status`, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch kyc status",
    );
  }
}
export async function getNokKyc(token) {
  try {
    const response = await axios.get(`${baseUrl}/kyc/next-of-kin`, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch next of kin kyc details",
    );
  }
}
export async function getBankDetails(token) {
  try {
    const response = await axios.get(`${baseUrl}/kyc/bank`, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch next of bank details",
    );
  }
}

export async function uploadBiodata(token, data) {
  try {
    const response = await axios.post(`${baseUrl}/kyc/biodata`, data, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to post biodata");
  }
}
export async function uploadNOK(token, data) {
  try {
    const response = await axios.post(`${baseUrl}/kyc/next-of-kin`, data, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to post next of kin",
    );
  }
}
export async function uploadBank(token, data) {
  try {
    const response = await axios.post(`${baseUrl}/kyc/bank`, data, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to post bank");
  }
}
export async function uploadID(token, data) {
  try {
    const response = await axios.post(
      `${baseUrl}/kyc/identity-document`,
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
      error.response?.data?.message || "Failed to post documents",
    );
  }
}
export async function uploadSignature(token, data) {
  try {
    const response = await axios.post(`${baseUrl}/kyc/upload-signature`, data, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to post signature",
    );
  }
}
export async function uploadProof(token, data) {
  try {
    const response = await axios.post(`${baseUrl}/kyc/proof-of-address`, data, {
      headers: {
        Authorization: `Bearer ${cleanToken(token)}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to post proof of address",
    );
  }
}
