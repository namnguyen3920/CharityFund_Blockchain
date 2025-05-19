import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../../../assets";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/campaigns",
  },
  {
    name: "create-campaign",
    imgUrl: createCampaign,
    link: "create-campaign",
  },
  {
    name: "transaction",
    imgUrl: payment,
    link: "/transactions",
  },
  // {
  //   name: "withdraw",
  //   imgUrl: withdraw,
  //   link: "/explore",
  //   disabled: true,
  // },
  // {
  //   name: "profile",
  //   imgUrl: profile,
  //   link: "/profile",
  // },
  {
    name: "logout",
    imgUrl: logout,
    link: "/",
  },
];
