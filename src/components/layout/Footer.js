import React from "react";

const Footer = () => {
  const array = [
    "FAQHelp",
    "CentreAccountMedia",
    "CentreInvestor",
    "relationsJobs",
    "Redeem gift cards",
    "Buy gift cards",
    "Ways to watch",
    "Terms of Use",
    "PrivacyCookie",
    "preferences",
    "Corporate",
    "information",
    "Contact us",
    "Speed test",
    "Legal",
    "notices",
    "Only on TMDB",
    "Australia",
  ];
  return (
    <div>
      <div className="page-container text-white mt-10 mb-20">
        <h5 className="mb-10">Questions? Phone <span className="cursor-pointer hover:text-primary">1800 875 462</span></h5>
        <div className="grid grid-cols-4 w-full ">
          {array.map((item) => (
            <div className="leading-10 cursor-pointer hover:text-primary" key={item}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
