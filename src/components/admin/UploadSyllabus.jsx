import React from 'react'
import Editicon from "../../assets/Editicon.png"
import Deleteicon from "../../assets/Deleteicon.png"

const UploadSyllabus = () => {
  return (
    <article className='admin__right__content__uploadsyllabus'>
      <div className='admin__right__content__uploadsyllabus__inputfield'>
        <label htmlFor="syllabus">Syllabus</label>
        <select name="syllabus" id="syllabus">
          <option value="none">Select</option>
          <option value="CBSE">CBSE</option>
          <option value="ICSE">ICSE</option>
          <option value="TS Board">TS Board</option>
          <option value="AP Board">AP Board</option>
        </select>
      </div>
      <div className='admin__right__content__uploadsyllabus__inputfield'>
        <label htmlFor="mediumofinstruction">Medium Of Instructions</label>
        <select name="mediumofinstruction" id="mediumofinstruction">
          <option value="none">Select</option>
          <option value="Telugu">Telugu</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
        </select>
      </div>
      <div className='admin__right__content__uploadsyllabus__inputfield'>
        <label htmlFor="class">Class</label>
        <select name="class" id="class">
          <option value="none">Select</option>
          <option value="class1">class1</option>
          <option value="class2">class2</option>
          <option value="class3">class3</option>
          <option value="class4">class4</option>
        </select>
      </div>
      <div className='admin__right__content__uploadsyllabus__inputfield'>
        <label htmlFor="subject">Subject</label>
        <select name="subject" id="subject">
          <option value="none">Select</option>
          <option value="Maths">Maths</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Social">Social</option>
        </select>
      </div>
      <div className='admin__right__content__uploadsyllabus__inputfield'>
        <label htmlFor="chapter">Chapters</label>
        <select name="chapter" id="chapter">
          <option value="none">Select</option>
          <option value="chapter1">Chapter1</option>
          <option value="chapter2">Chapter2</option>
          <option value="chapter3">Chapter3</option>
          <option value="chapter4">Chapter4</option>
        </select>
      </div>
      <div className='admin__right__content__uploadsyllabus__inputfield'>
        <label htmlFor="topic">Topics</label>
        <div className='admin__right__content__uploadsyllabus__inputfield__data'>
          <ul className='admin__right__content__uploadsyllabus__inputfield__data-list'>
            <li>
              <div>
                Topic 1 - Real Numbers
              </div>
              <div>
                <img src={Editicon} alt="" />
              </div>
              <div>
                <img src={Deleteicon} alt="" />
              </div>
            </li>
          </ul>
          <div className='admin__right__content__uploadsyllabus__inputfield__data-input'>
            <input type="text" name='topic' id='topic' />
            <button type='button'>Add</button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default UploadSyllabus
