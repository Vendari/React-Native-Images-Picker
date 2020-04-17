import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Link, withRouter } from "react-router-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { removePhoto, addPhoto } from "../actions/photos";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class PhotosPage extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    removePhoto: PropTypes.func.isRequired,
    addPhoto: PropTypes.func.isRequired
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
    if (!result.cancelled) this.props.addPhoto(result);
  };

  renderPhoto(photo) {
    const uri = photo.uri;
    return (
      <View>
        <Image
          key={uri}
          style={{ width: 175, height: 175, margin: 5 }}
          source={{ uri }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            color: "#000",
            top: 0,
            right: 0
          }}
          onPress={() => this.props.removePhoto(photo)}
        >
          <MaterialCommunityIcons
            name="delete-circle"
            style={{ color: "#f00", fontSize: 40, margin: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{}}>Image Picker</Text>
        {this.props.photos.length > 0 ? (
          <FlatList
            style={{ flex: 1, width: "100%", backgroundColor: "#ddd" }}
            data={this.props.photos}
            numColumns={2}
            alignItems={"center"}
            keyExtractor={item => item.uri}
            renderItem={({ item }) => this.renderPhoto(item)}
          />
        ) : (
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ddd"
            }}
          >
            <Text>Your photos will appear here</Text>
          </View>
        )}
        <View style={{ flexDirection: "row" }}>
          <Link to="/camera">
            <MaterialCommunityIcons
              name="camera"
              style={{ color: "#000", fontSize: 40, margin: 20 }}
            />
          </Link>
          <TouchableOpacity onPress={() => this.pickImage()}>
            <Ionicons
              name="ios-photos"
              style={{ color: "#000", fontSize: 40, margin: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    photos: state.photos.photos
  };
};

export default withRouter(
  connect(mapStateToProps, { removePhoto, addPhoto })(PhotosPage)
);
