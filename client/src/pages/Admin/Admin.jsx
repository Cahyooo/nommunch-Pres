import { useState } from "react";

import ContactTable from "./ContactTable";
import FeedbackTable from "./FeedbackTable";
import FlavorTable from "./FlavorTable";
import ProductTable from "./ProductTable";
import VisitorTable from "./VisitorTable";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("product");

  const tabs = [
    { id: "product", label: "Product" },
    { id: "visitor", label: "Visitor" },
    { id: "flavor", label: "Flavor" },
    { id: "contact", label: "Contact" },
    { id: "feedback", label: "Feedback" },
  ];

  return (
    <>
      {/* TAB BAR */}
      <div
        className="
          sticky top-0 z-50
          bg-base-100
          border-b
          mb-10
        "
      >
        <div className="flex justify-center gap-2 p-4 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={
                activeTab === tab.id
                  ? "btn btn-primary"
                  : "btn btn-outline"
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TITLE */}
      <h1 className="text-3xl text-center font-bold mb-10">
        {tabs.find((tab) => tab.id === activeTab)?.label}
      </h1>

      {/* CONTENT */}
      {activeTab === "product" && <ProductTable />}

      {activeTab === "visitor" && <VisitorTable />}

      {activeTab === "flavor" && <FlavorTable />}

      {activeTab === "contact" && <ContactTable />}

      {activeTab === "feedback" && <FeedbackTable />}
    </>
  );
}