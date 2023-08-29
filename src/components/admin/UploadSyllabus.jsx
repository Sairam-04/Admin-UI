import Editicon from "../../assets/Editicon.png";
import Deleteicon from "../../assets/Deleteicon.png";
import React, { useState, useEffect } from "react";
import Authorization from "../../authorization";
const Chapterupload = () => {
  const [showList, setShowList] = useState(false);
  const [curriculum, setCurriculum] = useState([]);
  const [moi, setMoi] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSyllabus, setSelectedSyllabus] = useState("none");
  const [selectedMoi, setSelectedMoi] = useState("none");
  const [selectedClass, setSelectedClass] = useState("none");
  const [selectedSubject, setSelectedSubject] = useState("none")
  const [chapters, setChapters] = useState([])
  const [newchapter, setNewChapter] = useState("")

  const toggleList = () => {
    setShowList(!showList);
  };

  useEffect(() => {
    fetch("http://localhost:8080/combine-details", {
      method: "GET",
      headers: {
        Authorization: Authorization,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCurriculum(data.curriculum[0].syllabus);
        setMoi(data.moi[0].medium_of_instruction);
        setClasses(data.classes[0].schooling);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    if (
      selectedSyllabus !== "none" &&
      selectedMoi !== "none" &&
      selectedClass !== "none"
    ) {
      const apiUrl = `http://localhost:8080/subjects_configuration?curriculum=${selectedSyllabus.toLowerCase()}&medium_of_instruction=${selectedMoi.toLowerCase()}&schooling=${selectedClass.toLowerCase()}`;

      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: Authorization,
          "Content-Type": "application/json",
        }
      })
        .then((response) => response.json())
        .then((data) => {
          const constructedPropertyName = `${selectedSyllabus.toLowerCase()}_${selectedMoi.toLowerCase()}_${selectedClass.toLowerCase()}`;
          const subjectsFromData = data[constructedPropertyName];
          setSubjects(subjectsFromData);
        })
        .catch((error) => {
          console.error("Error fetching subjects:", error);
        });
    }

    if (
      selectedSyllabus !== "none" &&
      selectedMoi !== "none" &&
      selectedClass !== "none" &&
      selectedSubject !== "none"
    ) {
      const apiUrl = `http://localhost:8080/chapters_configuration?curriculum=${selectedSyllabus.toLowerCase()}&medium_of_instruction=${selectedMoi.toLowerCase()}&schooling=${selectedClass.toLowerCase()}&subject=${selectedSubject.toLowerCase()}`;

      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: Authorization,
          "Content-Type": "application/json",
        }
      })
        .then((response) => response.json())
        .then((data) => {
          // const constructedPropertyName = `${selectedSyllabus.toLowerCase()}_${selectedMoi.toLowerCase()}_${selectedClass.toLowerCase()}_${selectedSubject.toLowerCase()}`;
          // const chaptersFromData = data ? data[constructedPropertyName] : [];
          const key = `${selectedSyllabus.toLowerCase()}_${selectedMoi.toLowerCase()}_${selectedClass.toLowerCase()}_${selectedSubject.toLowerCase()}`;
          const chaptersFromData = data ? data[key] : {};

          setChapters({
            "_id": data ? data._id : "",
            [key]: chaptersFromData
          });
          console.log(chapters)
        })
        .catch((error) => {
          console.error("Error fetching subjects:", error);
        });
    }
  }, [selectedSyllabus, selectedMoi, selectedClass, selectedSubject]);

  const handlenewchapter = (e) => {
    setNewChapter(e.target.value)
  }

  const handleSyllabusChange = (event) => {
    setSelectedSyllabus(event.target.value);
    setSubjects([]); // Clear subjects when syllabus changes
  };

  const handleMoiChange = (event) => {
    setSelectedMoi(event.target.value);
    setSubjects([]); // Clear subjects when moi changes
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setSubjects([]); // Clear subjects when class changes
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setChapters([]); // Clear subjects when class changes
  };



  return (
    <>
      <form action="">
        <div className="formcontainer">
          <article className="admin__right__content__uploadsyllabus">
            <div className="admin__right__content__uploadsyllabus__inputfield">
              <label htmlFor="syllabus">Syllabus</label>
              <select
                name="syllabus"
                id="syllabus"
                value={selectedSyllabus}
                onChange={handleSyllabusChange}
              >
                <option value="none">Select</option>
                {curriculum.map((syllabus, index) => (
                  <option key={index} value={syllabus}>
                    {syllabus}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin__right__content__uploadsyllabus__inputfield">
              <label htmlFor="mediumofinstruction">
                Medium Of Instructions
              </label>
              <select
                name="syllabus"
                id="syllabus"
                value={selectedMoi}
                onChange={handleMoiChange}
              >
                <option value="none">Select</option>

                {moi.map((moi, index) => (
                  <option key={index} value={moi}>
                    {moi}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin__right__content__uploadsyllabus__inputfield">
              <label htmlFor="class">Class</label>
              <select
                name="syllabus"
                id="syllabus"
                value={selectedClass}
                onChange={handleClassChange}
              >
                <option value="none">Select</option>

                {classes.map((classes, index) => (
                  <option key={index} value={classes}>
                    {classes}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin__right__content__uploadsyllabus__inputfield">
              <label htmlFor="subject">Subject</label>
              <select name="subject" id="subject" onChange={handleSubjectChange}>
                <option value="none">Select</option>
                {
                  (subjects) && (
                    subjects.map((ele, index) => (
                      <option value={ele} key={index}>
                        {ele}
                      </option>
                    ))
                  )
                }
              </select>
            </div>
            <div className="admin__right__content__uploadsyllabus__topic">
              <label className="admin__right__content__uploadsyllabus__topic__lable">
                Chapter
              </label>

              <div className="admin__right__content__uploadsyllabus__topic__text">
                <select
                  name="topic"
                  id="topic"
                  className="admin__right__content__uploadsyllabus__topic__dropdown"
                >
                  <option value="none">Select</option>
                  {chapters && selectedSyllabus !== "none" && selectedMoi !== "none" && selectedClass !== "none" && selectedSubject !== "none" &&
                    chapters[selectedSyllabus.toLowerCase() + '_' + selectedMoi.toLowerCase() + '_' + selectedClass.toLowerCase() + '_' + selectedSubject.toLowerCase()] &&
                    chapters[selectedSyllabus.toLowerCase() + '_' + selectedMoi.toLowerCase() + '_' + selectedClass.toLowerCase() + '_' + selectedSubject.toLowerCase()].map((chapter, index) => (
                      <option key={index} value={chapter}>{chapter}</option>
                    ))
                  }
                </select>

                <input type="text" name="newchapter" value={newchapter} onChange={handlenewchapter} />

                <button className="admin__right__content__uploadsyllabus__topic__add">
                  Add
                </button>
              </div>
            </div>

          </article>

          <button className="formcontainer-submitbtn"> Submit </button>
        </div>
      </form>



      <div>
        <button
          className="admin__right__content__uploadsyllabus__topic__btn"
          onClick={toggleList}
        >
          View List
        </button>

        {/* {showList && (
          <div className="list-container">
            <ul style={{ listStyleType: "none" }}>
              {listItems.map((item, index) => (
                <li key={index}>
                  <div className="admin__right__content__uploadsyllabus__topic__list-item">
                    <p>{item.text}</p>

                    <img src={Editicon} />

                    <img src={Deleteicon} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </>
  );
};
export default Chapterupload;
