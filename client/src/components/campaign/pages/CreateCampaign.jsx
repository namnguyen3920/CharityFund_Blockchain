import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { slugify } from "../../../utils/slugify";
import { useCampaignFactory } from "../../../context/CampaignFactoryContext";
import { money } from "../../../assets";
import { Loader } from "../../Loader";
import { CustomButton, FormField } from "../custom";
import { checkIfImage } from "../../../utils/campaignUtils";
import CampaignSlugRequest from "../../../Request/CampaignSlugRequest";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [slug, setSlug] = useState("");
  const { publishCampaign, isFactoryLoading, isCreateLoading } =
    useCampaignFactory();

  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    genesis_amount: "0.1",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFactoryLoading || isCreateLoading) return;

    setIsLoading(true);

    const slug = slugify(form.title);

    checkIfImage(form.image, async (exists) => {
      if (!exists) {
        setForm({ ...form, image: "" });
        setIsLoading(false);
        return;
      }

      try {
        const slugCheck = await CampaignSlugRequest.getCampaignAddress(slug);
        if (slugCheck?.data) {
          alert("Title already exists. Please choose a different title.");
          setIsLoading(false);
          return;
        }
      } catch (err) {
        if (err.response?.status !== 404) {
          console.error("Error checking slug:", err);
          alert("Error validating title slug.");
          setIsLoading(false);
          return;
        }
      }

      try {
        const tx = await publishCampaign(form);

        const receipt = await tx.wait();

        const event = receipt.events?.find(
          (e) => e.event === "CampaignDeployed"
        );

        if (!event) {
          throw new Error("Event not found!");
        }

        const campaignAddress = event.args.campaign;
        console.log("Receipt event", receipt);
        //const [campaignAddress] = receipt.events[0].args;

        console.log("Campaign Address:", campaignAddress);

        const result = await CampaignSlugRequest.createCampaignSlug({
          slug,
          campaignAddress,
        });

        if (result.status === 201) {
          navigate(`/campaigns/campaign-details/${slug}`);
        } else {
          alert("Failed to store campaign slug.");
        }
      } catch (err) {
        alert("Failed to create campaign.");
        console.error("Create error:", err);
      } finally {
        setIsLoading(false);
      }
    });
    console.log("Receipt event", receipt.events);
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {(isLoading || isCreateLoading) && (
        <Loader {..."Transaction is in process"} />
      )}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="Your Name"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Donation *"
            placeholder="This is a must. At least 0,1 ETH"
            inputType="text"
            value={form.genesis_amount}
            handleChange={(e) => handleFormFieldChange("genesis_amount", e)}
          />
          <FormField
            labelName="Goal *"
            placeholder="1 ETH"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
