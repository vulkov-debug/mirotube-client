import React, { useState } from "react";
import { Select, Modal, Card } from "antd";
import ReactPlayer from "react-player";
const {Meta} = Card

const AddVideoToPlaylist = ({
  visible,
  setVisible,
  videoNames,
  handleSubmit,
  selectedItems,
  setSelectedItems,
  handleChangeItemsInPlaylist,
  videosInModal,
  arrOfSelected,
  
}) => {
  const filteredOptions = videoNames.filter((o) => !selectedItems.includes(o));

  const savedToPlaylist = () => {
    handleSubmit();
    setVisible(false);
    setSelectedItems([]);
  };

  return (
    <Modal
      footer={null}
      visible={visible}
      title="Add videos to playlist"
      onCancel={() => setVisible(false)}
    >
      <Select
        mode="multiple"
        value={selectedItems}
        onChange={(v) => handleChangeItemsInPlaylist(v)}
        // onDeselect={v=> handleDeleteItemsInPlaylist(v)}
        style={{ width: "100%" }}
      >
        {filteredOptions.map((item) => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
      {JSON.stringify(arrOfSelected)}
      <div className="container-fluid row">
      {videosInModal && videosInModal.length >0 &&
        (videosInModal.map(item => (
            <div className="col-md-4 pt-3">
          <Card>
            <ReactPlayer url={item.video.Location} width="100%" height="100%" />
              <Meta description={item.title.substring(0,16)}/>
          </Card>

            </div>
        )))}
        </div>
      <button
        className="btn btn-primary btn-block mt-3"
        onClick={savedToPlaylist}
      >
        Add to playlist
      </button>
    </Modal>
  );
};

export default AddVideoToPlaylist;
