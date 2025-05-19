import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCampaignDetails } from "../../../hooks/useCampaignDetails";
import CampaignSlugRequest from "../../../Request/CampaignSlugRequest";

const CampaignDonations = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getDetails } = useCampaignDetails();
  const [donators, setDonors] = useState([]);
  const [isClaimed, setIsClaimed] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await CampaignSlugRequest.getCampaignAddress(slug);
        const address = res.data.address;
        const donors = await useCampaignDetails(address).getBlocks();
        setDonors(donors);
      } catch (err) {
        console.error("Error loading donors:", err);
      } finally {
        setIsLoading(false);
      }
    };
    setIsClaimed(getDetails().isClaimed);
    fetch();
  }, [slug, isClaimed]);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br px-6 py-10 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Donations</h2>
        </div>

        <table className="w-full text-sm bg-[#0f172a] rounded-lg overflow-hidden">
          <thead className="bg-[#1e293b] text-gray-400">
            <tr>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Donor</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {donators.length <= 1 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No donors yet.
                </td>
              </tr>
            ) : (
              (donators.length > 2
                ? donators.slice(1, -1)
                : donators.slice(1)
              ).map((d, i) => (
                <tr key={i} className="border-b border-gray-700">
                  <td className="px-4 py-2">{d.amount}</td>
                  <td className="px-4 py-2 truncate max-w-[250px]">
                    {d.donor}
                  </td>
                  <td className="px-4 py-2">{d.date}</td>
                  <td className="px-4 py-2">{d.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignDonations;
