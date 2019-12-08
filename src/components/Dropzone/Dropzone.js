import {useDropzone} from "react-dropzone";
import React, {useState} from "react";
import styles from './Dropzone.module.scss'
import {Icon} from "antd";

const DropzoneComp = (props) => {
  const [uploaded, setUploaded] = useState()

  const {getRootProps, getInputProps} = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: acceptedFiles => {
      if (props.onChange) {
        props.onChange(acceptedFiles[0]);
      }
      setUploaded(true)
    }
  });
  return (
    <div className={styles.dropzone}>
      <span className={styles.label}>{props.title || 'Your photo'}</span>
      <div>
        <section {...getRootProps()} className={styles.wrapper}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop file here, or click to select</p>
        </section>
        {uploaded && <Icon type="check"/>}
      </div>

    </div>
  )
}

export default DropzoneComp