import React from 'react'
import image1 from "../../assets/uploadicon.png"
import ReusabaleComponent from "./ReusableComponent"

const ContentUpload = () => {
  return (
    <>
      <form action="">
        <div className="formcontainer">
          <article className='admin__right__content__contentupload'>
            <ReusabaleComponent></ReusabaleComponent>
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
            <div className="admin__right__content__contentupload__upload">
              <div className="admin__right__content__contentupload__upload__box">
                <img src={image1} className="img" />
                <div className='admin__right__content__contentupload__upload-container'>
                  <div className="admin__right__content__contentupload__upload__heading">Select PDF file to Upload</div>
                  <div className='admin__right__content__contentupload__upload__desc'>PDF, file size no more than 10MB</div>
                </div>
                <label for="file-upload" class="custom-file-upload">
                  SELECT FILE
                </label>
                <input id="file-upload" type="file" accept='.pdf' />
              </div>

              <div className="admin__right__content__contentupload__upload__box">
                <img src={image1} className="img" />
                <div className='admin__right__content__contentupload__upload-container'>
                  <div className="admin__right__content__contentupload__upload__heading">Select PPT file to Upload</div>
                  <div className='admin__right__content__contentupload__upload__desc'>PDF, file size no more than 10MB</div>
                </div>
                <label for="file-upload" class="custom-file-upload">
                  SELECT FILE
                </label>
                <input id="file-upload" type="file" accept='.ppt' />
              </div>

              <div className="admin__right__content__contentupload__upload__box">
                <img src={image1} className="img" />
                <div className='admin__right__content__contentupload__upload-container'>
                  <div className="admin__right__content__contentupload__upload__heading">Select History Video to Upload</div>
                  <div className='admin__right__content__contentupload__upload__desc'>PDF, file size no more than 70MB</div>
                </div>
                <label for="file-upload" class="custom-file-upload">
                  SELECT FILE
                </label>
                <input id="file-upload" type="file" accept='.mp4' />
              </div>

              <div className="admin__right__content__contentupload__upload__box">
                <img src={image1} className="img" />
                <div className='admin__right__content__contentupload__upload-container'>
                  <div className="admin__right__content__contentupload__upload__heading">Select Simulation file to Upload</div>
                  <div className='admin__right__content__contentupload__upload__desc'>JPG, PNG or PDF, file size less than 10MB</div>
                </div>
                <label for="file-upload" class="custom-file-upload">
                  SELECT FILE
                </label>
                <input id="file-upload" type="file" accept='.pdf' />
              </div>

              <div className="admin__right__content__contentupload__upload__box">
                <img src={image1} className="img" />
                <div className='admin__right__content__contentupload__upload-container'>
                  <div className="admin__right__content__contentupload__upload__heading">Select Game file to Upload</div>
                  <div className='admin__right__content__contentupload__upload__desc'>.exe file size no more than 50MB</div>
                </div>
                <label for="file-upload" class="custom-file-upload">
                  SELECT FILE
                </label>
                <input id="file-upload" type="file" accept=".exe" />
              </div>

              <div className="admin__right__content__contentupload__upload__box">
                <img src={image1} className="img" />
                <div className='admin__right__content__contentupload__upload-container'>
                  <div className="admin__right__content__contentupload__upload__heading">Select Previous Papers file to Upload</div>
                  <div className='admin__right__content__contentupload__upload__desc'>JPG, PNG or PDF, file size less than 10MB</div>
                </div>
                <label for="file-upload" class="custom-file-upload">
                  SELECT FILE
                </label>
                <input id="file-upload" type="file" accept=".png, .jpg, .pdf" />
              </div>


              <div className="admin__right__content__contentupload__upload__box">
                <img src={image1} className="img" />
                <div className='admin__right__content__contentupload__upload-container'>
                  <div className="admin__right__content__contentupload__upload__heading">Select Animation video to Upload</div>
                  <div className='admin__right__content__contentupload__upload__desc'>.mp4 file size no more than 50MB</div>
                </div>
                <label for="file-upload" class="custom-file-upload">
                  SELECT FILE
                </label>
                <input id="file-upload" type="file" accept=".mp4" />
              </div>

              <div className="admin__right__content__contentupload__upload__box">
                <img src={image1} className="img" />
                <div className='admin__right__content__contentupload__upload-container'>
                  <div className="admin__right__content__contentupload__upload__heading">Select Applications file to Upload</div>
                  <div className='admin__right__content__contentupload__upload__desc'>JPG,PNG or PDF,file size less than 10MB</div>
                </div>
                <label for="file-upload" class="custom-file-upload">
                  SELECT FILE
                </label>
                <input id="file-upload" type="file" accept=".png, .jpg, .pdf" />
              </div>
            </div>
          </article>
          <button className="formcontainer-submitbtn"> Submit </button>
        </div>
      </form>
    </>
  )
}

export default ContentUpload
