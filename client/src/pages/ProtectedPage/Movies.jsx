// Importing React and necessary components
import React, { useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { useFetchMoviesQuery } from "@/redux/api/fetchApi";
import VideosGridLayout from "./components/VideosGridLayout";

// Movies component definition
function Movies() {
  // Using the useFetchMoviesQuery hook to fetch movies data
  const { data, isLoading, refetch } = useFetchMoviesQuery();

  // JSX rendering
  return (
    <>
      {/* SearchBar component with label and movies data */}
      <SearchBar label={"Movies"} data={data} />

      {/* VideosGridLayout component displaying movies videos */}
      <VideosGridLayout
        heading={"Movies"}
        isLoading={isLoading}
        data={data}
        refetch={refetch} // Pass refetch function to VideosGridLayout
      />
    </>
  );
}

// Exporting the Movies component as default
export default Movies;
