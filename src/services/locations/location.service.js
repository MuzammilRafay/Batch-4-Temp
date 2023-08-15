import camelize from "camelize";
import { locations } from "./location.mock";

export const locationRequest = (searchTerm = "san francisco") => {
  return new Promise((resolve, reject) => {
    const locationDummyData = locations[searchTerm];
    //location["san francisco"]

    if (!locationDummyData) {
      reject("not found");
    }

    const transformLocationData = locationTransform(locationDummyData);

    resolve(transformLocationData);
  });
};

const locationTransform = (data) => {
  const { results } = data;
  const formattedResponse = camelize(results);
  const { geometry } = formattedResponse[0];

  return {
    viewport: geometry.viewport,
    lat: geometry.location.lat,
    lng: geometry.location.lng,
  };
};

//{lat:000,lng:00};

// locationRequest()
// .then(locationDummyData => console.log(locationDummyData))
// .catch(error => console.log(error)) //not found
