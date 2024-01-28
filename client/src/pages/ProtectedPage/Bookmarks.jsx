import SearchBar from "./components/SearchBar";
import { useFetchBookmarksQuery } from "@/redux/api/fetchApi";
import VideosGridLayout from "./components/VideosGridLayout";

export default function Bookmarks() {
  // Fetching bookmarks data using useFetchBookmarksQuery
  const { data, isLoading, isSuccess } = useFetchBookmarksQuery();

  // Separating movies and series data from the fetched data
  const moviesData = data?.movies ?? [];
  const seriesData = data?.series ?? [];

  // Deciding the order to render based on the number of movies and series
  const renderOrder =
    moviesData.length > seriesData.length
      ? ["movies", "series"]
      : ["series", "movies"];

  return (
    <>
      {/* Search bar with label "Bookmarks" */}
      <SearchBar
        label={"Bookmarks"}
        // Combining movies and series data for search functionality
        data={isSuccess ? [...moviesData, ...seriesData] : []}
      />
      {/* Rendering VideosGridLayout for each data type (movies, series) */}
      {renderOrder.map((dataType, index) => (
        <VideosGridLayout
          key={index}
          isLoading={isLoading}
          heading={`Bookmarked ${dataType === "movies" ? "Movies" : "Series"}`}
          data={dataType === "movies" ? moviesData : seriesData}
          // Message to display when there is no data of the current type
          noDataMessage={`No ${
            dataType === "movies" ? "movies" : "series"
          } bookmarked`}
        />
      ))}
    </>
  );
}
