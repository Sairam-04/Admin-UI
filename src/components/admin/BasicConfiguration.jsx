// TabSwitcher.js
import React, { useState, useEffect } from "react";
import deleteicon from '../../assets/Deleteicon.png';
import editicon from '../../assets/Editicon.png';
import { useQuery } from "react-query";
import FetchData from "../../services/FetchData";

function BasicConfiguration() {
  const [activeTab, setActiveTab] = useState("syllabus");
  const [selectedOption, setSelectedOption] = useState("");
  const [syllabusoptions, setsyllabusOptions] = useState({});
  const [moioptions, setmoioptions] = useState(["Telugu", "English"]);
  const [classoptions, setclassOptions] = useState(["Class 1", "Class 2"]);
  const [subjectoptions, setsubjectOptions] = useState(["Maths", "Science"]);
  const [chapteroptions, setchapterOptions] = useState(["Chapter 1", "chapter 2"]);
  const [topicoptions, settopicOptions] = useState(["topic 1", "topic 2"]);
  const [contenttypeoptions, settcontenttypeOptions] = useState(["History", "Evolution"]);

  const { data, error, isLoading } = useQuery(
    'basicdata',
    () => FetchData("http://localhost:8080/curriculum")
  );

  const [syllabus, setSyllabus] = useState([]);

  useEffect(() => {
    if (!isLoading && !error) {
      // setSyllabus(data);
      setsyllabusOptions({
        "_id": data[0]?._id,
        "syllabus": data[0]?.syllabus
      })
    }
  }, [data, isLoading, error]);

  if (isLoading) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
          <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
        </path>
      </svg>
    );
  }
  console.log(data)

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
    console.log(syllabusoptions)
    if (activeTab === "syllabus") {
      return (
        <div className="basicconfigurationblock">
          <div className="options">
            {
              (syllabusoptions && syllabusoptions?.syllabus) && (
                syllabusoptions?.syllabus.map((option, index) => (
                  <div className="option" key={index}>
                    {option.title}
                    <span className="icons">
                      <img src={editicon} alt="Edit" className="icon" />
                      <img src={deleteicon} alt="Delete" className="icon" />
                    </span>
                  </div>
                ))
              )
            }
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

