import React, { useState } from "react";
import { Divider } from "antd";
import CheckableTag from "antd/lib/tag/CheckableTag";

const TagSuggest = ({ tags, setTags, tagsSuggestions }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    setSelectedTags(nextSelectedTags);


    const addTag = (tag) => {
      setTags([...tags, tag]);
    };

    const filterTag = (tag) => {
      nextSelectedTags.filter((t) => t !== tag)
      
      setTags(prevState => prevState.filter(t=> t!==tag))
    };
    if (checked) {
      addTag(tag);
    } else {
      filterTag(tag);
    }
  };

  return (
    <>
      <Divider orientation="left">
        <i className="text-muted">TagSuggest</i>
      </Divider>
      {tagsSuggestions &&
        tagsSuggestions.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      <hr />
    </>
  );
};

export default TagSuggest;
