import React, { useState } from 'react';
import ReusableComponent from './ReusableComponent';

const ContentConfiguration = () => {
  const [checkboxes, setCheckboxes] = useState({
    History: false,
    Importance: false,
    Evolution: false,
    ConceptOverview: false,
    Lecture: false,
    Animation: false,
    Applications: false,
    Gaming: false,
    Simulation: false,
    FutureEnhancements: false,
    Practice: false,
    Experiments: false,
    PDF: false,
    PreviousPapers: false,
    VR: false,
    AR: false,
    Outcomes: false,
  });

  const handleCheckboxChange = (option) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [option]: !prevCheckboxes[option],
    }));
  };

  return (
    <article className='admin__right__content__contentconfiguration'>
      <ReusableComponent />

      <div className='admin__right__content__uploadsyllabus__inputfield'>
        <label htmlFor="topic">Topics</label>
        <select name="topic" id="topic">
          <option value="none">Select</option>
          <option value="topic1">Topic 1</option>
          <option value="topic2">Topic 2</option>
          <option value="topic3">Topic 3</option>
          <option value="topic4">Topic 4</option>
        </select>
      </div>

      <div className='admin__right__content__contentconfiguration__inputfield'>
        <div className='admin__right__content__contentconfiguration__checkbox-container'>
          {Object.keys(checkboxes).map((option) => (
            <div key={option} className='form-checkbox'>
              <input
                type='checkbox'
                id={option}
                checked={checkboxes[option]}
                onChange={() => handleCheckboxChange(option)}
              />
              <label htmlFor={option}>{option.replace(/([a-z])([A-Z])/g, '$1 $2')}</label>
            </div>
          ))}
        </div>
      </div>
      {/* <div className='admin__right__content__contentconfiguration__submit-button'>
        <button type='submit'>Submit</button>
      </div> */}
    </article>
  );
};

export default ContentConfiguration;
