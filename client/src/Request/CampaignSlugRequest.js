import AxiosHelper from "./AxiosHelper";

class CampaignSlugRequest {
  createCampaignSlug(data) {
    const url = "/campaigns";
    return AxiosHelper.post(url, data);
  }

  getCampaignSlug(data) {
    const url = `/campaigns/get-slug/${data}`;
    return AxiosHelper.get(url);
  }

  getCampaignAddress(data) {
    const url = `/campaigns/get-address/${data}`;
    return AxiosHelper.get(url);
  }
}

export default new CampaignSlugRequest();
