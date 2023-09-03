import { createContext, useContext, useEffect, useState } from "react";
import { RestaurantRequest } from "./restaurants.service";
import { LocationContext } from "../locations/location.context";

export const RestaurantsContext = createContext();

export const RestaurantProvider = (props) => {
  const { children } = props;
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    if (location) {
      const locationString = `${location?.lat},${location?.lng}`;
      getRestaurants(locationString);
    }
  }, [location]);

  const getRestaurants = (locationParameter) => {
    setIsLoading(true);
    setTimeout(() => {
      RestaurantRequest(locationParameter)
        .then((result) => {
          setRestaurants(result);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
    }, 500);
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
