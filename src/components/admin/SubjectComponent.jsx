import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import deleteicon from '../../assets/Deleteicon.png';
import editicon from '../../assets/Editicon.png';
import FetchData from "../../services/FetchData";
import checkmarkIcon from "../../assets/saveicon.png"
import cancelIcon from "../../assets/cancelicon.png"
import Authorization from '../../authorization';
import { getAdmin } from '../../utils/localstorage';

const SubjectComponent = () => {
    const { role } = getAdmin();
    const { data, error, isLoading } = useQuery(
        'subject_data',
        () => FetchData("http://localhost:8080/subject")
    );

    const [subjectoptions, setSubjectOptions] = useState([]);
    const [newsubject, setNewSubject] = useState("");
    const [editedText, setEditedText] = useState(""); // New state for edited text
    const [editingIndex, setEditingIndex] = useState(-1);
    const [originalOptions, setOriginalOptions] = useState([]);

    useEffect(() => {
        if (!isLoading && !error) {
            setSubjectOptions({
                "_id": data[0]?._id,
                "subject": data[0]?.subject
            })
            setOriginalOptions(data[0]?.subject);
        }
    }, [data, isLoading, error]);

    const handlesubject = (e) => {
        setNewSubject(e.target.value);
    };

    const startEditing = (index, option) => {
        setEditingIndex(index);
        setEditedText(option);
    };

    const cancelEditing = () => {
        setEditingIndex(-1);
        setEditedText("");
    };

    const revertToOriginal = (index) => {
        setEditingIndex(-1);
        setEditedText("");
        const updatedOptions = [...subjectoptions];
        updatedOptions[index] = originalOptions[index];
        setSubjectOptions(updatedOptions);
    };

    const saveEditedSubject = async (option, index, documentId) => {
        try {
            const response = await fetch(
                "http://localhost:8080/subject",
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authorization
                    },
                    body: JSON.stringify({
                        "documentId": documentId,
                        "language": option,
                        "arrayIndex": index
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

    const postSubject = async (documentId) => {
        if (newsubject.trim() === "") {
            return;
        }
        try {
            const response = await fetch(
                "http://localhost:8080/subject",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU1N2RiOWVkOTFkNzQ0MWQ3YTllZDUiLCJlbWFpbCI6InN1cGVyYWRtaW5AYnJhbmVlZHVjYXRpb24uY29tIiwicGFzc3dvcmQiOiJCckBuZTEyMyIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImF2YXRhciI6Imh0dHBzOi8vcmVxcmVzLmluL2ltZy9mYWNlcy84LWltYWdlLmpwZyIsImlhdCI6MTY5MzAyODczOSwiZXhwIjoxNjkzMDU3NTM5fQ.3s0Jeq2oWebN-DgmQ3x8iVsxUk__rpLyI-Q5FcjNAYc'
                    },
                    body: JSON.stringify({
                        "documentId": documentId,
                        "language": newsubject
                    })
                }
            );
            if (response.ok) {
                setNewSubject("")
                alert("Data Submitted Successfully")
            } else {
                console.error('Post request failed');
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    const deleteSubject = async (documentId, option) => {
        // Implement delete logic
        try {
            const response = await fetch(
                "http://localhost:8080/subject",
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authorization
                    },
                    body: JSON.stringify({
                        "documentId": documentId,
                        "language": option
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

    if (isLoading) {
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                    <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
                </path>
            </svg>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <div className="basicconfigurationblock">
            <div className="options">
                {
                    (subjectoptions && subjectoptions?.subject) && (
                        subjectoptions.subject.map((option, index) => (
                            <div className="option" key={index}>
                                {editingIndex === index ? (
                                    <input
                                        type="text"
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                    />
                                ) : (
                                    option
                                )}
                                {
                                    (role === "super_admin") ? (
                                        <span className="icons">
                                            {editingIndex === index ? (
                                                <>
                                                    <img
                                                        src={checkmarkIcon}
                                                        alt="Save"
                                                        className="icon"
                                                        onClick={() => saveEditedSubject(editedText, index, subjectoptions?._id)}
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
                                                        src={editicon}
                                                        alt="Edit"
                                                        className="icon"
                                                        onClick={() => startEditing(index, option)}
                                                    />
                                                    <img
                                                        src={deleteicon}
                                                        alt="Delete"
                                                        className="icon"
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to delete this Curriculum?')) {
                                                                deleteSubject(subjectoptions?._id, option)
                                                            }
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </span>
                                    ) : (
                                        null
                                    )
                                }
                            </div>
                        ))
                    )
                }
            </div>
            <div className="add-option">
                <input
                    type="text"
                    value={newsubject}
                    onChange={handlesubject}
                    placeholder="Enter an option"
                />
                <button onClick={() => postSubject(subjectoptions?._id)}>Add</button>
            </div>
        </div>
    );
};

export default SubjectComponent;
