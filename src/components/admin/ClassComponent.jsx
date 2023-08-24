import React, {useState, useEffect} from 'react'
import { useQuery } from 'react-query';
import deleteicon from '../../assets/Deleteicon.png';
import editicon from '../../assets/Editicon.png';
import FetchData from "../../services/FetchData";


const ClassComponent = (handleAddOption) => {
    const [classoptions, setClassOptions] = useState([]);
    const [newclass, setNewClass] = useState("");
    const handleclass = (e) => {
        setNewClass(e.target.value);
      };    
    const { data, error, isLoading } = useQuery(
        'class_data',
        () => FetchData("http://localhost:8080/schooling")
    );


    useEffect(() => {
        if (!isLoading && !error) {
            setClassOptions({
                "_id": data[0]?._id,
                "schooling": data[0]?.schooling
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

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div className="basicconfigurationblock">
            <div className="options">
                {
                    (classoptions && classoptions?.schooling) && (
                        classoptions?.schooling.map((option, index) => (
                            <div className="option" key={index}>
                                {/* {option.title} */}
                                {option}
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
                    value={newclass}
                    onChange={handleclass}
                    placeholder="Enter an option"
                />
                <button 
                // onClick={handleAddOption}
                >Add</button>
            </div>
        </div>
    )
}

export default ClassComponent
