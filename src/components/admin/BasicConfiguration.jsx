// TabSwitcher.js
import React, { useState } from "react";
import deleteicon from '../../assets/Deleteicon.png';
import editicon from '../../assets/Editicon.png';

function BasicConfiguration() {
  const [activeTab, setActiveTab] = useState("syllabus");
  const [selectedOption, setSelectedOption] = useState("");
  const [syllabusoptions, setsyllabusOptions] = useState(["CBSE", "ICSE"]);
  const [moioptions, setmoioptions] = useState(["Telugu", "English"]);
  const [classoptions, setclassOptions] = useState(["Class 1", "Class 2"]);
  const [subjectoptions, setsubjectOptions] = useState(["Maths", "Science"]);
  const [chapteroptions, setchapterOptions] = useState(["Chapter 1", "chapter 2"]);
  const [topicoptions, settopicOptions] = useState(["topic 1", "topic 2"]);
  const [contenttypeoptions, settcontenttypeOptions] = useState(["History", "Evolution"]);
  

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddOption = () => {
    if (selectedOption) {
      setOptions([...options, selectedOption]);
      setSelectedOption("");
    }
  };

  const renderTabContent = () => {
    if (activeTab === "syllabus") {
      return (
        <div className="basicconfigurationblock">
          <div className="options">
            {syllabusoptions.map((option, index) => (
              <div className="option" key={index}>
                {option}
                <span className="icons">
                  <img src={editicon} alt="Edit" className="icon" />
                  <img src={deleteicon} alt="Delete" className="icon" />
                </span>
              </div>
            ))}
          </div>
          <div className="add-option">
            <input
              type="text"
              value={selectedOption}
              onChange={handleOptionChange}
              placeholder="Enter an option"
            />
            <button onClick={handleAddOption}>Add</button>
          </div>
        </div>
      );
    } 
    if (activeTab === "moi") {
      return (
        <div>
          <div className="options">
            {moioptions.map((option, index) => (
              <div className="option" key={index}>
                {option}
                <span className="icons">
                  <img src={editicon} alt="Edit" className="icon" />
                  <img src={deleteicon} alt="Delete" className="icon" />
                </span>
              </div>
            ))}
          </div>
          <div className="add-option">
            <input
              type="text"
              value={selectedOption}
              onChange={handleOptionChange}
              placeholder="Enter an option"
            />
            <button onClick={handleAddOption}>Add</button>
          </div>
        </div>
      );
    } 
    if (activeTab === "class") {
      return (
        <div>
          <div className="options">
            {classoptions.map((option, index) => (
              <div className="option" key={index}>
                {option}
                <span className="icons">
                  <img src={editicon} alt="Edit" className="icon" />
                  <img src={deleteicon} alt="Delete" className="icon" />
                </span>
              </div>
            ))}
          </div>
          <div className="add-option">
            <input
              type="text"
              value={selectedOption}
              onChange={handleOptionChange}
              placeholder="Enter an option"
            />
            <button onClick={handleAddOption}>Add</button>
          </div>
        </div>
      );
    } 
    if (activeTab === "subject") {
      return (
        <div>
          <div className="options">
            {subjectoptions.map((option, index) => (
              <div className="option" key={index}>
                {option}
                <span className="icons">
                  <img src={editicon} alt="Edit" className="icon" />
                  <img src={deleteicon} alt="Delete" className="icon" />
                </span>
              </div>
            ))}
          </div>
          <div className="add-option">
            <input
              type="text"
              value={selectedOption}
              onChange={handleOptionChange}
              placeholder="Enter an option"
            />
            <button onClick={handleAddOption}>Add</button>
          </div>
        </div>
      );
    }
    if (activeTab === "chapter") {
      return (
        <div>
          <div className="options">
            {chapteroptions.map((option, index) => (
              <div className="option" key={index}>
                {option}
                <span className="icons">
                  <img src={editicon} alt="Edit" className="icon" />
                  <img src={deleteicon} alt="Delete" className="icon" />
                </span>
              </div>
            ))}
          </div>
          <div className="add-option">
            <input
              type="text"
              value={selectedOption}
              onChange={handleOptionChange}
              placeholder="Enter an option"
            />
            <button onClick={handleAddOption}>Add</button>
          </div>
        </div>
      );
    } 
    if (activeTab === "topic") {
      return (
        <div>
          <div className="options">
            {topicoptions.map((option, index) => (
              <div className="option" key={index}>
                {option}
                <span className="icons">
                  <img src={editicon} alt="Edit" className="icon" />
                  <img src={deleteicon} alt="Delete" className="icon" />
                </span>
              </div>
              
            ))}
          </div>
          <div className="add-option">
            <input
              type="text"
              value={selectedOption}
              onChange={handleOptionChange}
              placeholder="Enter an option"
            />
            <button onClick={handleAddOption}>Add</button>
          </div>
        </div>
      );
    }   
    if (activeTab === "contentype") {
      return (
        <div>
          <div className="options">
            {contenttypeoptions.map((option, index) => (
              <div className="option" key={index}>
                {option}
                <span className="icons">
                  <img src={editicon} alt="Edit" className="icon" />
                  <img src={deleteicon} alt="Delete" className="icon" />
                </span>
              </div>
              
            ))}
          </div>
          <div className="add-option">
            <input
              type="text"
              value={selectedOption}
              onChange={handleOptionChange}
              placeholder="Enter an option"
            />
            <button onClick={handleAddOption}>Add</button>
          </div>
        </div>
      );
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
          className={`admin__right__content__tab-switcher__tabs-tab ${activeTab === "chapter" ? "active" : ""}`}
          onClick={() => handleTabChange("chapter")}
        >
          Chapter
        </div>
        <div
          className={`admin__right__content__tab-switcher__tabs-tab ${activeTab === "topic" ? "active" : ""}`}
          onClick={() => handleTabChange("topic")}
        >
          Topics
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

