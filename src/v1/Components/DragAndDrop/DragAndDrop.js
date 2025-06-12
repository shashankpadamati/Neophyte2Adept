import React, { useEffect, useRef, useState } from "react";
// styles
import "./DragAndDrop.scss";

//PropTypes
import PropTypes from "prop-types";

//Toast
import { toast } from "react-toastify";
import editIcon from "../../../Assets/svgs/edit-button.svg";
import RoundButton from "../RoundButton/RoundButton";

export default function DragAndDrop({ label, className, onChange, value, image , name}) {
  const fileRef = useRef();
  const [highlight, setHighlight] = useState(false);
  const [fileName, setFilename] = useState("");
  const [imageUrl, setImageUrl] = useState(value);

  useEffect(() => {
    if (value) {
      setImageUrl(value);
    }
  }, [value]);

  const onDrop = (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    if (files.length) {
      setFilename(files[0].name);
      const filesReceived = files;
      const error = false;
      if (error) {
        setHighlight(false);
        toast.error(error);
      } else {
        setHighlight(false);
        if (filesReceived && filesReceived.length > 0) {
          onChange(filesReceived[0] || filesReceived[0]["file"]);
        }
      }
    } else {
      setHighlight(false);
    }
  };

  const dragEnter = (e) => {
    e.preventDefault();
    setHighlight(true);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setHighlight(false);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);

    setFilename(file.name);
    if (file) {
      onChange(file);
      if (e && e.target) {
        e.target.value = "";
      }
    }
  };
  const handleEdit = () => {
    fileRef.current.click();
  };

  const renderDragAndDropContent = (fileName) => {
    return (
      <div className="BoxContent">
        {(imageUrl || value) && (
          <div className="BoxContent__Close">
            <RoundButton onclick={handleEdit} imageURL={editIcon} />
          </div>
        )}
        {(imageUrl) ? (
          <img className="BoxContent__Image" src={ imageUrl } alt="" />
        ) : (
          <div className="BoxContent__Heading">
            Drag & drop file here, or
            <span>
              <span
                onClick={() =>
                  fileRef && fileRef.current ? fileRef.current.click() : null
                }
                className="BoxContent__Heading__Browse"
              >
                {" "}
                Browse
              </span>
            </span>
          </div>
        )}
        <input
          id="upload-csv"
          type="file"
          // accept=".csv"
          style={{ display: "none" }}
          name={name}
          onChange={(e) => onFileChange(e)}
          ref={fileRef}
        />
      </div>
    );
  };

  return (
    <div className={`Uploader ${className}`}>
      <div className="Uploader__Head">
        <div className="Uploader__Head__Label">{label}</div>
      </div>
      <div
        className={`Uploader__DropZone ${className} ${
          highlight ? "highlight" : ""
        }`}
        onDragOver={dragEnter}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={onDrop}
        data-testid="drop-zone-container-id"
      >
        <div className="Uploader__DropZone__TextContent">
          {renderDragAndDropContent(fileName)}
        </div>
      </div>
    </div>
  );
}

DragAndDrop.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  validFormats: PropTypes.array,
};
DragAndDrop.defaultProps = {
  label: "",
  className: "",
  value: {},
  onChange: () => {},
  validFormats: ["pdf", "png"],
};
