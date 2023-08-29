import Editicon from "../../assets/Editicon.png";
import Deleteicon from "../../assets/Deleteicon.png";
import checkmarkIcon from '../../assets/saveicon.png';
import cancelIcon from "../../assets/cancelicon.png"
import React, { useState, useEffect } from "react";
import Authorization from "../../authorization";
import { getAdmin } from "../../utils/localstorage";

const UploadTopicSyllabus = () => {
    const [showList, setShowList] = useState(false);
    const [curriculum, setCurriculum] = useState([]);
    const [moi, setMoi] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [selectedSyllabus, setSelectedSyllabus] = useState("none");
    const [selectedMoi, setSelectedMoi] = useState("none");
    const [selectedClass, setSelectedClass] = useState("none");
    const [selectedSubject, setSelectedSubject] = useState("none")
    const [selectedChapter, setSelectedChapter] = useState("none")
    const [topics, setTopics] = useState([])
    const [newtopic, setNewTopic] = useState("")
    const [editedText, setEditedText] = useState(""); // New state for edited text
    const [editingIndex, setEditingIndex] = useState(-1);
    const [originalOptions, setOriginalOptions] = useState([]);
    const { role } = getAdmin()


    const toggleList = () => {
        setShowList(!showList);
    };


    const fetchCurriculumDetails = () => {
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
    };

    const fetchSubjects = () => {
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
                },
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
    };

    const fetchChapters = () => {
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
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    const key = `${selectedSyllabus.toLowerCase()}_${selectedMoi.toLowerCase()}_${selectedClass.toLowerCase()}_${selectedSubject.toLowerCase()}`;
                    const chaptersFromData = data ? data[key] : {};

                    setChapters(chaptersFromData);
                })
                .catch((error) => {
                    console.error("Error fetching subjects:", error);
                });
        }
    };

    const fetchTopics = async () => {
        if (
            selectedSyllabus !== "none" &&
            selectedMoi !== "none" &&
            selectedClass !== "none" &&
            selectedSubject !== "none" &&
            selectedChapter !== "none"
        ) {
            try {
                const apiUrl = `http://localhost:8080/topics_configuration?curriculum=${selectedSyllabus.toLowerCase()}&medium_of_instruction=${selectedMoi.toLowerCase()}&schooling=${selectedClass.toLowerCase()}&subject=${selectedSubject.toLowerCase()}&chapter=${selectedChapter.toLowerCase()}`;

                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        Authorization: Authorization,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const key = `${selectedSyllabus.toLowerCase()}_${selectedMoi.toLowerCase()}_${selectedClass.toLowerCase()}_${selectedSubject.toLowerCase()}_${selectedChapter.toLowerCase()}`;
                    const TopicsFromData = data ? data[key] : {};
                    const newTopicsState = {
                        "_id": data ? data._id : "",
                        [key]: TopicsFromData,
                    };

                    setTopics(newTopicsState);
                    setOriginalOptions(TopicsFromData);
                } else {
                    console.error("Error fetching topics:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching topics:", error);
            }
        }
    };


    useEffect(() => {
        fetchCurriculumDetails();
        fetchSubjects();
        fetchChapters();
    }, [selectedSyllabus, selectedMoi, selectedClass, selectedSubject]);

    useEffect(() => {
        if (
            selectedSyllabus !== "none" &&
            selectedMoi !== "none" &&
            selectedClass !== "none" &&
            selectedSubject !== "none" &&
            selectedChapter !== "none"
        ) {
            fetchTopics();
        }
    }, [selectedChapter]);

    const handlenewtopic = (e) => {
        setNewTopic(e.target.value)
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

    const handleChapterChange = (event) => {
        const newSelectedChapter = event.target.value;
        setSelectedChapter(newSelectedChapter);
        // fetchTopics();
    }

    const startEditing = (index, option) => {
        setEditingIndex(index);
        setEditedText(option);
    };


    const revertToOriginal = (index) => {
        setEditingIndex(-1);
        setEditedText("");
        const updatedOptions = [...topics];
        updatedOptions[index] = originalOptions[index];
        setTopics(updatedOptions);
    };

    const saveEditedTopics = async (option, index, documentId) => {
        try {
            const response = await fetch(
                "http://localhost:8080/topics_configuration",
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authorization
                    },
                    body: JSON.stringify({
                        "documentId": documentId,
                        "update_topic": option,
                        "arrayIndex": `${index}`,
                        "curriculum": selectedSyllabus.toLowerCase(),
                        "medium_of_instruction": selectedMoi.toLowerCase(),
                        "schooling": selectedClass.toLowerCase(),
                        "subject": selectedSubject.toLowerCase(),
                        "chapter": selectedChapter.toLowerCase()
                    })
                }
            );
            if (response.ok) {
                alert("Data Edited Successfully")
            } else {
                console.error('PUT request failed');
            }
        }
        catch (error) {
            console.log(error)
        }
        revertToOriginal(index)
    };

    const postNewTopic = async (documentId) => {
        if (newtopic.trim() === "") {
            return;
        }
        try {
            console.log(selectedChapter, selectedClass, selectedMoi, selectedSubject, selectedSyllabus)
            const response = await fetch(
                "http://localhost:8080/topics_configuration",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authorization
                    },
                    body: JSON.stringify({
                        "documentId": documentId,
                        "new_topic": newtopic,
                        "curriculum": selectedSyllabus.toLowerCase(),
                        "medium_of_instruction": selectedMoi.toLowerCase(),
                        "schooling": selectedClass.toLowerCase(),
                        "subject": selectedSubject.toLowerCase(),
                        "chapter": selectedChapter.toLowerCase()
                    })
                }
            );
            if (response.ok) {
                setNewTopic("")
                alert("Data Added Successfully")
            } else {
                console.error('Post request failed');
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteChapter = async (documentId, option) => {
        // Implement delete logic
        try {
            const response = await fetch(
                "http://localhost:8080/topics_configuration",
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authorization
                    },
                    body: JSON.stringify({
                        "documentId": documentId,
                        "delete_topic": option,
                        "curriculum": selectedSyllabus.toLowerCase(),
                        "medium_of_instruction": selectedMoi.toLowerCase(),
                        "schooling": selectedClass.toLowerCase(),
                        "subject": selectedSubject.toLowerCase(),
                        "chapter": selectedChapter.toLowerCase()
                    })
                }
            );
            if (response.ok) {
                alert("Deleted Successfully")
            } else {
                console.error("Delete request failed");
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <>
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
                                subjects ? (
                                    subjects.map((ele, index) => (
                                        <option value={ele} key={index}>
                                            {ele}
                                        </option>
                                    ))
                                ) : (
                                    <i className="fa fa-spinner fa-spin"></i>
                                )
                            }
                        </select>
                    </div>
                    <div className="admin__right__content__uploadsyllabus__inputfield">
                        <label htmlFor="chapter">Chapter</label>
                        <select name="chapter" id="chapter" onChange={handleChapterChange}>
                            <option value="none">Select</option>
                            {
                                chapters ? (
                                    chapters.map((ele, index) => (
                                        <option value={ele} key={index}>
                                            {ele}
                                        </option>
                                    ))
                                ) : (
                                    <i className="fa fa-spinner fa-spin"></i>

                                )
                            }
                        </select>
                    </div>

                    <div className="admin__right__content__uploadsyllabus__topic">
                        <label className="admin__right__content__uploadsyllabus__topic__lable">
                            Topic
                        </label>

                        <div className="admin__right__content__uploadsyllabus__topic__text">
                            <select
                                name="topic"
                                id="topic"
                                className="admin__right__content__uploadsyllabus__topic__dropdown"
                            >
                                <option value="none">Select</option>
                                {
                                    originalOptions ? (
                                        originalOptions.map((topic, index) => (
                                            <option key={index} value={topic}>
                                                {topic}
                                            </option>
                                        ))
                                    ) : (
                                        <i className="fa fa-spinner fa-spin"></i>
                                    )
                                }
                            </select>

                            <input type="text" name="newtopic" value={newtopic} onChange={handlenewtopic} />

                            <button
                                onClick={() => postNewTopic(topics?._id)}
                                className="admin__right__content__uploadsyllabus__topic__add"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                </article>
            </div>



            <div>
                <button
                    className="admin__right__content__uploadsyllabus__topic__btn"
                    onClick={toggleList}
                >
                    View List
                </button>

                {
                    (showList && topics &&
                        selectedSyllabus !== "none" && selectedMoi !== "none" && selectedClass !== "none" && selectedSubject !== "none" && selectedChapter !== "none" &&
                        topics[selectedSyllabus.toLowerCase() + '_' + selectedMoi.toLowerCase() + '_' + selectedClass.toLowerCase() + '_' + selectedSubject.toLowerCase() + '_' + selectedChapter.toLowerCase()]
                    ) && (
                        <div className="admin__right__content__uploadsyllabus__container">
                            <ul>
                                {
                                    topics[selectedSyllabus.toLowerCase() + '_' + selectedMoi.toLowerCase() + '_' + selectedClass.toLowerCase() + '_' + selectedSubject.toLowerCase() + '_' + selectedChapter.toLowerCase()].map((item, index) => (
                                        <li
                                            key={index}
                                        >
                                            <div>
                                                {editingIndex === index ? (
                                                    <input
                                                        type="text"
                                                        value={editedText}
                                                        onChange={(e) => setEditedText(e.target.value)}
                                                    />
                                                ) : (
                                                    item
                                                )}
                                            </div>
                                            {
                                                (role === "super_admin") ? (
                                                    <div>
                                                        {editingIndex === index ? (
                                                            <>
                                                                <img
                                                                    src={checkmarkIcon}
                                                                    alt="Save"
                                                                    className="icon"
                                                                    onClick={() => saveEditedTopics(editedText, index, topics?._id)}
                                                                />
                                                                <img
                                                                    src={cancelIcon}
                                                                    alt="Cancel"
                                                                    className="icon"
                                                                    onClick={() => revertToOriginal(index)}
                                                                />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <img
                                                                    src={Editicon}
                                                                    alt="Edit"
                                                                    className="icon"
                                                                    onClick={() => startEditing(index, item)}
                                                                />
                                                                <img
                                                                    src={Deleteicon}
                                                                    alt="Delete"
                                                                    className="icon"
                                                                    onClick={() => {
                                                                        if (window.confirm('Are you sure you want to delete this Curriculum?')) {
                                                                            deleteChapter(topics?._id, item)
                                                                        }
                                                                    }}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                ) : (
                                                    null
                                                )
                                            }
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}
            </div>
        </>
    );
};
export default UploadTopicSyllabus;

