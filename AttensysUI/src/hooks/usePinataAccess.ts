import { useState, useEffect } from "react";
import { PinataSDK } from "pinata";

export const usePinataAccess = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
    pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
  });

  const createAccessLink = async (cid: string, expires: number = 86400) => {
    try {
      setLoading(true);
      setError(null);
      const accessUrl = await pinata.gateways.private.createAccessLink({
        cid,
        expires,
      });
      setUrl(accessUrl);
      return accessUrl;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createAccessLink, url, loading, error };
};
