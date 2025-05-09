import { useState, useEffect } from "react";
import FundRequest from "../Request/FundRequest";

export function useFunds() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFunds() {
      try {
        const res = await FundRequest.getFunds();
        console.log("Funds:", res.data);
        if (res.status !== 200) {
          throw new Error("Failed to fetch funds");
        }
        setFunds(res.data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadFunds();
  }, []);

  return { funds, loading, error };
}
