import React from 'react'
import Editicon from "../../assets/Editicon.png"
import Deleteicon from "../../assets/Deleteicon.png"
import ReusableComponent from './ReusableComponent'

const UploadSyllabus = () => {
  return (
    <article className='admin__right__content__uploadsyllabus'>
      <ReusableComponent />
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
            <input type="text" name='topic' id='topic' placeholder='Enter a Topic' />
            <button type='button'>Add</button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default UploadSyllabus
