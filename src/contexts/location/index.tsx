import * as React from 'react';

interface coords {
  lat: number;
  lng: number;
}

export interface location {
  coords: coords;
  address: string;
}

interface locationObj extends location {
  name: string;
}

type contextProps = {
  currentLocation: location | locationObj | null;
  savedLocations: Array<locationObj> | null;
  setCurrentLocation: React.Dispatch<
    React.SetStateAction<location | locationObj | null>
  >;
  addToSavedLocation: (addObj: location, name: string) => void;
  removeFromSavedLocations: (name: string) => void;
};

const LocationContext = React.createContext<contextProps | null>(null);

// {
//   coords: {
//     lat: -80.322,
//     lang: 35.322,
//   },
//   details: {
//     address: 'Road 5, Dishergarh Asansol Barddhaman',
//   },
// }

const LocationProvider: React.FunctionComponent = ({children}) => {
  const [currentLocation, setCurrentLocation] = React.useState<
    location | locationObj | null
  >(null);
  const [savedLocations, setSavedLocations] = React.useState<
    Array<locationObj>
  >([]);

  const addToSavedLocation = (addObj: location, name: string) => {
    if (addObj && name) {
      try {
        const index = savedLocations?.findIndex(el => el?.name === name);
        if (index !== -1) {
          //   kill the Execution and let the user know that the name Already exists
        } else {
          setSavedLocations(prev => [...prev, {name: name, ...addObj}]);
          return;
        }
      } catch (error) {
        throw error;
      }
    }
    //   any Error Handling Goes Here
  };
  const updateSavedLocations = () => {};
  const removeFromSavedLocations = (name: string) => {
    if (name) {
      try {
        const index = savedLocations.findIndex(el => el.name == name);
        if (index !== -1) {
          if (index === 0) {
            setSavedLocations(prev => [...prev.slice(index + 1)]); // If it is the top most Element
            return;
          } else {
            setSavedLocations(prev => [
              ...prev.slice(0, index),
              ...prev.slice(index + 1),
            ]);
            return;
          }
        } else {
          // if the Product Does not exist at all
        }
      } catch (error) {
        throw error;
      }
    }
  };
  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        savedLocations,
        setCurrentLocation,
        addToSavedLocation,
        removeFromSavedLocations,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

export {LocationContext, LocationProvider};
