import {useDropzone} from "react-dropzone";
import React from "react";
import styles from './Dropzone.module.scss'

const DropzoneComp = (props) => {
  const {getRootProps, getInputProps} = useDropzone({
    accept: "image/*",
    multiple: false,
    noDrag: true,
    onDrop: acceptedFiles => {
      if (props.onChange) {
        props.onChange(acceptedFiles[0]);
      }
    }
  });
  return (
    <div className={styles.dropzone}>
      <span className={styles.label}>{props.title || 'Your photo'}</span>
      <section {...getRootProps()} className={styles.wrapper}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop file here, or click to select</p>
      </section>
    </div>
  )
}

export default DropzoneComp