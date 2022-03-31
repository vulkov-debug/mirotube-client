import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import {
  CloseOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";

function SearchBar({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchHistoryFiltered, setSearchHistoryFiltered] = useState([]);

  const [placeholder, setPlaceholder] = useState("Search your video here ...");
  const [visible, setVisible] = useState(false);

  const historyRef = useRef(null);
  const searchRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    fetchSearchResults();
  }, [wordEntered]);

  useEffect(() => {
    getUserSearchHistory();
  }, []);

  const getUserSearchHistory = async () => {
    const { data } = await axios.get("/api/current-user");
    console.log("user", data);
    setSearchHistory(data.search_history);
  };

  const fetchSearchResults = async () => {
    setLoading(true);
    if (wordEntered !== "" && wordEntered != 12) {
      const { data } = await axios.get(`/api/search/${wordEntered}`);
      setResults(data);
      setLoading(false);
    } else {
      setSearchHistoryFiltered(searchHistory);
      setResults([]);
      setLoading(false);
      setWordEntered("12");
    }
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setWordEntered(event.target.value);
    const newFilter = results.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }

    const historyFilter = searchHistory.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord != "") {
      setSearchHistoryFiltered(historyFilter);
    }
  };

  const handleSearch = (value) => {
    setVisible(false);
    if (wordEntered.length > 0) {
      router.push(`/search/${value.title}`);
      setWordEntered(value.title);
      setFilteredData([]);
      setSearchHistoryFiltered([]);
    }
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter" && wordEntered.length > 0 && wordEntered != 12) {
      axios.post("/api/search", { search: wordEntered });
      router.push(`/search/${wordEntered}`);
      setFilteredData([]);
      setSearchHistoryFiltered([]);
      getUserSearchHistory();
    }
  };

  const deleteSearchEntry = async (title) => {
    await axios.post("/api/delete-search-entry", { title });
    fetchSearchResults()
    getUserSearchHistory()
    toast.success(`${title} deleted successfully !!`);
  };

  return (
    <div
      className="m-auto search d-flex "
      onBlur={() => setTimeout(() => setVisible(false), 300)}
    >
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered == 12 ? "" : wordEntered}
          onChange={(e) => handleFilter(e)}
          onKeyDown={(e) => handleSubmit(e)}
          onClick={() => {
            fetchSearchResults();
            setWordEntered("");
            setVisible(true);
          }}
          style={{
            color: "black",
            borderRadius: "10px",
            height: "35px",
            width: "500px",
            padding: "15px",
          }}
        />
        <SearchOutlined className="h4 pl-2 " />
      </div>

      {wordEntered && wordEntered.length != 0 && visible && (
        <div className="dataResult" style={{  maxHeight: '500px' }}>
          {searchHistoryFiltered.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" key={key} tabIndex={0}>
                <p onClick={() => handleSearch(value)}>
                  {value.title.substring(0, 53)}{" "}
                  {value.title.length > 53 && " ..."}{" "}
                </p>
                <DeleteOutlined
                  className="text-danger"
                  style={{ marginTop: "40px", marginRight: "20px" }}
                  onClick={() => deleteSearchEntry(value.title)}
                />
              </a>
            );
          })}
          {filteredData.slice(0, 5).map((value, key) => {
            return (
              <a className="dataItem" key={key}>
                <p onClick={() => handleSearch(value)}>
                  {value.title.substring(0, 53)}{" "}
                  {value.title.length > 53 && " ..."}{" "}
                </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
