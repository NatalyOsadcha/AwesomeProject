import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = ({route}) => {
//   const [location, setLocation] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       const coords = {
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       };
//       setLocation(coords);
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.mapStyle}
//         region={{
//           ...location,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         showsUserLocation={true}
//       >
//         {location && (
//           <Marker title="I am here" coordinate={location} description="Hello" />
//         )}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   mapStyle: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });
  
   if (route.params.location) {
        const location = route.params.location;
        return (
          <View style={{flex: 1,}}>
               {location && <MapView style={{flex: 1,}} showsUserLocation={true}         
                 region={{
               latitude: location.latitude,
               longitude: location.longitude,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421,
             }}>
                <Marker 
             coordinate={{ latitude: location.latitude, longitude: location.longitude}}
             title={route.params.locationName}/>
             </MapView>}
             </View>
             )
    }

    return (
       <View style={{flex: 1,}}>
        <MapView
        style={{flex: 1,}}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title="I am here"
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          description='Hello'
        />
      </MapView>
    </View>
    )
}

export default MapScreen;
