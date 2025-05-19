import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CampaignSlugRequest from "../../../Request/CampaignSlugRequest";
import { useCampaignDetails } from "../../../hooks/useCampaignDetails";
import { ethers } from "ethers";
import { campaignABI } from "../../../utils/constants";

const CampaignLog = () => {
  const { slug } = useParams();
  const [campaignAddress, setCampaignAddress] = useState(null);
  const [logs, setLogs] = useState([]);
  const [createdAt, setCreatedAt] = useState(null);
  const [withdrawAt, setWithdrawAt] = useState(null);
  const [genesisAmount, setGenesisAmount] = useState("0");
  const [owner, setOwner] = useState("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await CampaignSlugRequest.getCampaignAddress(slug);
        console.log("Response: ", res);
        setCampaignAddress(res.data.address);
      } catch (err) {
        console.error("Failed to fetch campaign address:", err);
      }
    };
    fetchAddress();
  }, [campaignAddress]);
  console.log("Campaign Address: ", campaignAddress);
  const { getDetails, getBlocks } = useCampaignDetails(campaignAddress);

  useEffect(() => {
    const fetchLog = async () => {
      if (!campaignAddress) return;
      const [blocks, details] = await Promise.all([getBlocks(), getDetails()]);
      setOwner(details.owner);
      const campaign = new ethers.Contract(
        campaignAddress,
        campaignABI,
        provider
      );
      const blk0 = await campaign.getBlock(0);
      console.log("Block 0: ", blk0);
      console.log("Campaign Data: ", details);
      setCreatedAt(details.createdAt);
      setGenesisAmount(blocks[0].amount);

      const withdrawBlock = blocks[blocks.length - 1];
      if (details.claimed) {
        setWithdrawAt(
          new Date(withdrawBlock.timestamp * 1000).toLocaleString()
        );
      }
      console.log("Blocks:", blocks);
      const mapped = blocks.map((b, i) => ({
        index: b.index,
        donor: b.donor,
        amount: b.amount,
        date: new Date(b.timestamp * 1000).toLocaleString(),
        message: b.message || "-",
      }));
      setLogs(mapped);
    };

    fetchLog();
  }, [campaignAddress]);

  console.log("Logs:", logs);

  console.log("Created At:", createdAt);
  console.log("Withdraw At:", withdrawAt);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br px-6 py-10 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Campaign's History</h2>

        <div className="mb-6 text-sm space-y-1">
          <p>
            <strong>Creator:</strong> {owner}
          </p>
          <p>
            <strong>First Donation:</strong> {genesisAmount} ETH
          </p>
          <p>
            <strong>Created At:</strong> {createdAt}
          </p>
          {withdrawAt && (
            <p>
              <strong>Withdraw Time:</strong> {withdrawAt}
            </p>
          )}
        </div>

        <table className="w-full text-sm bg-[#0f172a] rounded-lg overflow-hidden">
          <thead className="bg-[#1e293b] text-gray-400">
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Donor</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-b border-gray-700">
                <td className="px-4 py-2">{log.index + 1}</td>
                <td className="px-4 py-2 truncate max-w-[200px]">
                  {log.donor}
                </td>
                <td className="px-4 py-2">{log.amount}</td>
                <td className="px-4 py-2">{log.date}</td>
                <td className="px-4 py-2">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignLog;
