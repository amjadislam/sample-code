class UserLocation {
  timestamp: string = '';
  mocked: boolean = false;
  coords: Coords = null;
}

class Coords {
  altitude: number = 0;
  heading: number = 0;
  altitudeAccuracy: number = 0;
  latitude: number = 0;
  speed: number = 0;
  longitude: number = 0;
  accuracy: number = 0;
}

export default UserLocation;
