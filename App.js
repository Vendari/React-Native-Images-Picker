import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CameraPage from "./pages/CameraPage";
import PhotosPage from "./pages/PhotosPage";
import { Provider } from "react-redux";
import { NativeRouter, Route, Link } from "react-router-native";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <NativeRouter>
        <View style={styles.container}>
          <Route exact path="/" component={PhotosPage} />
          <Route path="/camera" component={CameraPage} />
        </View>
      </NativeRouter>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  }
});
