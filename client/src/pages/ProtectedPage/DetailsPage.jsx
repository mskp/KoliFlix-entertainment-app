import { useFetchDetailsQuery } from "@/redux/api/fetchApi";
import React from "react";
import { useLoaderData } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorPage from "../../components/ErrorPage";
import StarRating from "./components/StarRating";

export default function DetailsPage() {
  // Fetching the parameter (id) from react-router's useLoaderData
  const paramId = useLoaderData();

  // Using useFetchDetailsQuery to get details data based on the parameter
  const { data, isLoading, isError } = useFetchDetailsQuery({ paramId });

  // Loading state: Display loading spinner while data is being fetched
  if (isLoading) return <LoadingSpinner />;

  // Error state: Display an error page if there's an issue fetching data
  if (isError) return <ErrorPage />;

  // Rendering details page with fetched data
  return (
    <section className={`flex flex-col gap-4`}>
      {/* Displaying the thumbnail image */}
      <figure>
        <img
          src={data.thumbnailURL}
          alt={data.name}
          className="object-cover rounded-md shadow-lg"
        />
      </figure>

      {/* Section for movie/series details */}
      <section className="flex flex-col gap-4">
        {/* Movie/series name and release year */}
        <h2 className="text-2xl lg:text-4xl">
          {data.name} ({data.releaseYear})
        </h2>

        {/* Star rating component */}
        <StarRating rating={data.rating.split(" ")[1]} />

        {/* Languages section */}
        <div className="flex flex-col gap-2">
          <p className="text-zinc-500 text-xl self-baseline">Languages</p>
          <ul className="flex flex-wrap gap-2">
            {data.languages.map((language) => (
              <li
                key={language}
                className="border rounded-md p-1 bg-zinc-800 text-xs list-none"
              >
                {language}
              </li>
            ))}
          </ul>
        </div>

        {/* Genres section */}
        <div className="flex flex-col gap-2">
          <p className="text-zinc-500 text-xl self-baseline">Genres</p>
          <ul className="flex flex-wrap gap-2">
            {data.genres.map((genre) => (
              <li
                key={genre}
                className="border rounded-md p-1 bg-zinc-800 text-xs list-none"
              >
                {genre}
              </li>
            ))}
          </ul>
        </div>

        {/* Overview section */}
        <div>
          <p className="text-zinc-500 text-xl self-baseline">Overview</p>
          <p className="text-sm lg:text-base">{data.overview}</p>
        </div>

        {/* Casts section */}
        <div className="flex flex-col gap-2">
          <p className="text-zinc-500 self-baseline text-xl">Casts</p>
          <ul className="flex flex-wrap gap-2">
            {data.casts.map((cast) => (
              <li
                key={cast}
                className="border rounded-md p-1 bg-zinc-800 text-xs list-none"
              >
                {cast}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}
