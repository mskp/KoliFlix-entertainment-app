// Importing React and necessary components
import React from "react";
import SearchBar from "./components/SearchBar";
import { useFetchSeriesQuery } from "@/redux/api/fetchApi";
import VideosGridLayout from "./components/VideosGridLayout";

// Series component definition
function Series() {
  // Using the useFetchSeriesQuery hook to fetch series data
  const { data, isLoading } = useFetchSeriesQuery();

  // JSX rendering
  return (
    <>
      {/* SearchBar component with label and series data */}
      <SearchBar label={"Series"} data={data} />

      {/* VideosGridLayout component displaying series videos */}
      <VideosGridLayout heading={"Series"} isLoading={isLoading} data={data} />
    </>
  );
}

// Exporting the Series component as default
export default Series;
