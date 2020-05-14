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

export const getCoordinates = (coords) => {
  coords = coords.replace(" ", "").split(",");
  return {
    lat: coords[0],
    lon: coords[1],
  };
};

export const cleanJoiValidator = (error) => error.replace(/[^a-zA-Z ]/g, "");

// function modified from https://stackoverflow.com/questions/11475146/javascript-regex-to-validate-gps-coordinates
export const validateCoordinates = (lat, lon) => {
  const ck_lat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  const ck_lon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
  const validLat = ck_lat.test(lat);
  const validLon = ck_lon.test(lon);
  if (validLat && validLon) {
    return true;
  } else {
    return false;
  }
};
