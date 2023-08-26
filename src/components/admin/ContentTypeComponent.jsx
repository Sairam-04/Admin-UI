import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import deleteicon from '../../assets/Deleteicon.png';
import editicon from '../../assets/Editicon.png';
import FetchData from "../../services/FetchData";
import checkmarkIcon from "../../assets/saveicon.png"
import cancelIcon from "../../assets/cancelicon.png"
import Authorization from '../../authorization';

const ContentTypeComponent = () => {
    const { data, error, isLoading } = useQuery(
        'contenttype_data',
        () => FetchData("http://localhost:8080/content_types")
    );

    const [contenttypeoptions, setContentTypeOptions] = useState([]);
    const [newcontenttype, setNewContentType] = useState("");
    const [editedText, setEditedText] = useState(""); // New state for edited text
    const [editingIndex, setEditingIndex] = useState(-1);
    const [originalOptions, setOriginalOptions] = useState([]);

    useEffect(() => {
        if (!isLoading && !error) {
            // setDocId(data[0]?._id)
            setContentTypeOptions({
                "_id": data[0]?._id,
                "content_types": data[0]?.content_types
            })
            setOriginalOptions(data[0]?.content_types);
        }
    }, [data, isLoading, error]);

    const handlecontenttype = (e) => {
        setNewContentType(e.target.value);
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
        const updatedOptions = [...contenttypeoptions];
        updatedOptions[index] = originalOptions[index];
        setContentTypeOptions(updatedOptions);
    };

    const saveEditedContentType = async (option, index, documentId) => {
        // Implement save logic
        // Reset editingIndex and editedText after successful save
        try {
            const response = await fetch(
                "http://localhost:8080/content_types",
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authorization
                    },
                    body: JSON.stringify({
                        "documentId": documentId,
                        "content_type": option,
                        "arrayIndex": index
                    })
                }
            );
            if (response.ok) {
                console.log('PUT request successful');
            } else {
                console.error('PUT request failed');
            }
        }
        catch (error) {
            console.log(error)
        }
        revertToOriginal(index)
    };

    const postContentType = async (documentId) => {
        if (newcontenttype.trim() === "") {
            return;
        }
        try {
            const response = await fetch(
                "http://localhost:8080/content_types",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authorization
                    },
                    body: JSON.stringify({
                        "documentId": documentId,
                        "content_type": newcontenttype
                    })
                }
            );
            if (response.ok) {
                setNewContentType("");
                alert("Data Submitted Successfully")
            } else {
                console.error('Post request failed');
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    const deleteMOI = async (documentId,option) => {
        try {
            const response = await fetch(
                "http://localhost:8080/content_types",
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authorization
                    },
                    body: JSON.stringify({
                        "documentId": documentId,
                        "content_type": option
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
                    (contenttypeoptions && contenttypeoptions?.content_types) && (
                        contenttypeoptions.content_types.map((option, index) => (
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
                                <span className="icons">
                                    {editingIndex === index ? (
                                        <>
                                            <img
                                                src={checkmarkIcon}
                                                alt="Save"
                                                className="icon"
                                                onClick={() => saveEditedContentType(editedText, index, contenttypeoptions?._id)}
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
                                                onClick={() => deleteMOI(contenttypeoptions?._id,option)}
                                            />
                                        </>
                                    )}
                                </span>
                            </div>
                        ))
                    )
                }
            </div>
            <div className="add-option">
                <input
                    type="text"
                    value={newcontenttype}
                    onChange={handlecontenttype}
                    placeholder="Enter an option"
                />
                <button onClick={() => postContentType(contenttypeoptions?._id)}>Add</button>
            </div>
        </div>
    );
};

export default ContentTypeComponent;
