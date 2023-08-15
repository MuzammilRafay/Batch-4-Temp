import React, { useEffect, useState } from "react";
import { locationRequest } from "./location.service";

export const LocationContext = React.createContext();

function LocationContextProvider(props) {
  const { children } = props;
  const [keyword, setKeyword] = useState("san francisco");
  const [location, setLoaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearchHandler = (searchKeyword) => {
    if (searchKeyword) {
      setIsLoading(true);

      setTimeout(() => {
        setKeyword(searchKeyword);
      }, 500);
    }
  };

  useEffect(() => {
    if (!keyword.length) {
      //don't do anything with empty search;
      return;
    }

    locationRequest(keyword)
      .then((result) => {
        setIsLoading(false);
        setError(null);
        setLoaction(result);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{ keyword, location, isLoading, error, search: onSearchHandler }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export default LocationContextProvider;
