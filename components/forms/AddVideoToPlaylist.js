import React, { useState } from "react";
import { Select, Modal } from "antd";

const AddVideoToPlaylist = ({
  visible,
  setVisible,
  videoNames,
  handleSubmit,
  selectedItems,
  setSelectedItems,
}) => {
  const filteredOptions = videoNames.filter((o) => !selectedItems.includes(o));

  const savedToPlaylist = () => {
    handleSubmit();
    setVisible(false);
    setSelectedItems([])
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
        onChange={(v) => setSelectedItems(v)}
        style={{ width: "100%" }}
      >
        {filteredOptions.map((item) => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
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
