// TabSwitcher.js
import React, { useState, useEffect } from "react";
import deleteicon from '../../assets/Deleteicon.png';
import editicon from '../../assets/Editicon.png';
import { useQuery } from "react-query";
import FetchData from "../../services/FetchData";
import SyllabusComponent from "./SyllabusComponent";
import MediumOfInstructionComponent from "./MediumOfInstructionComponent";
import ClassComponent from "./ClassComponent";
import SubjectComponent from "./SubjectComponent";
import ContentTypeComponent from "./ContentTypeComponent";

function BasicConfiguration() {
  const [activeTab, setActiveTab] = useState("syllabus");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  const handleAddOption = () => {
    console.log("abc")
  };

  const renderTabContent = () => {
    if (activeTab === "syllabus") {
      return <SyllabusComponent handleAddOption={handleAddOption} />
    }
    if (activeTab === "moi") {
      return <MediumOfInstructionComponent handleAddOption={handleAddOption} />
    }
    if (activeTab === "class") {
      return <ClassComponent handleAddOption={handleAddOption} />
    }
    if (activeTab === "subject") {
      return <SubjectComponent handleAddOption={handleAddOption} />
    }
    if (activeTab === "contentype") {
      return <ContentTypeComponent handleAddOption={handleAddOption} />
    }
  };

  return (
    <div className="admin__right__content__tab-switcher">
      <div className="admin__right__content__tab-switcher__tabs">
        <div
          className={`admin__right__content__tab-switcher__tabs-tab ${activeTab === "syllabus" ? "active" : ""}`}
          onClick={() => handleTabChange("syllabus")}
        >
          Syllabus
        </div>
        <div
          className={`admin__right__content__tab-switcher__tabs-tab ${activeTab === "moi" ? "active" : ""}`}
          onClick={() => handleTabChange("moi")}
        >
          Medium of instruction
        </div>
        <div
          className={`admin__right__content__tab-switcher__tabs-tab ${activeTab === "class" ? "active" : ""}`}
          onClick={() => handleTabChange("class")}
        >
          class
        </div>
        <div
          className={`admin__right__content__tab-switcher__tabs-tab ${activeTab === "subject" ? "active" : ""}`}
          onClick={() => handleTabChange("subject")}
        >
          Subject
        </div>
        <div
          className={`admin__right__content__tab-switcher__tabs-tab ${activeTab === "contentype" ? "active" : ""}`}
          onClick={() => handleTabChange("contentype")}
        >
          content types
        </div>
      </div>
      <div className="admin__right__content__tab-switcher__tab-content">{renderTabContent()}</div>
    </div>
  );
}

export default BasicConfiguration;

