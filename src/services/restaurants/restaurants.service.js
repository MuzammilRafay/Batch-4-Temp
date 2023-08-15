import { mockImages, mocks } from "./mock/index";
import camelize from "camelize";
export const RestaurantRequest = (location = "37.7749295,-122.4194155") => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];

    if (!mock) {
      reject("no data found");
    }

    const tempResponse = restaurantTransform(mock);

    resolve(tempResponse);
  });
};

export const restaurantTransform = (data) => {
  const results = camelize(data?.results);
  const mappedResults = results?.map((singleRestaurant) => {
    singleRestaurant.photos = singleRestaurant.photos.map((singlePhoto) => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });

    return {
      ...singleRestaurant,
      address: singleRestaurant?.vicinity,
      isOpenNow: Boolean(singleRestaurant?.openingHours?.openNow),
      isClosedTemporarily:
        singleRestaurant?.businessStatus === "CLOSED_TEMPORARILY",
    };
  });

  return mappedResults;
};
