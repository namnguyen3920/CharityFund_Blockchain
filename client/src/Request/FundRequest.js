import AxiosHelper from "./AxiosHelper";

/**
 * Request to register user.
 * @param {*} user a user object
 * @returns a response of the request
 */

class FundRequest {
  getFunds() {
    return AxiosHelper.get("/fund/get-funds");
  }
  getFundById(id) {
    return AxiosHelper.get(`/fund/${id}`);
  }
  createFund(fund) {
    return AxiosHelper.post("/fund/create-fund", fund);
  }
}

export default new FundRequest();
