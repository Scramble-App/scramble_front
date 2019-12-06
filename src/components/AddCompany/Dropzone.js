import {useDropzone} from "react-dropzone";
import React from "react";


const DropzoneComp = (props) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    noDrag: true,
    onDrop: acceptedFiles => {
      const files = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      console.log(files, acceptedFiles)
      if (props.onChange) {
        props.onChange(acceptedFiles[0]);
      }
    }
      });
     return (
       <div>
        {/*{({getRootProps, getInputProps}) => (*/}
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                      </section>
                    {/*)}*/}
                  </div>
     )
}

export default DropzoneComp