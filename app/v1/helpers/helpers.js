// function modified from https://www.geodatasource.com/developers/javascript
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    let radlat1 = (Math.PI * lat1) / 180;
    let radlat2 = (Math.PI * lat2) / 180;
    let theta = lon1 - lon2;
    let radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return parseFloat(dist.toFixed(1));
  }
};
export const arraySorter = (myArray) => {
  return myArray.sort((a, b) => {
    if (a.distance < b.distance) {
      return -1;
    }
    if (a.distance > b.distance) {
      return 1;
    }
    return 0;
  });
};

export const getCoordinates = (from, to) => {
  from = from.trim().split(",");
  to = to.trim().split(",");
  return {
    lat1: from[0],
    lon1: from[1],
    lat2: to[0],
    lon2: to[1],
  };
};

export const cleanJoiValidator = (error) => error.replace(/[^a-zA-Z ]/g, "");
