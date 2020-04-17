import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity
} from "react-native";
import { Camera } from "expo-camera";
import { addPhoto } from "../actions/photos";
import { Link, withRouter } from "react-router-native";
import * as ImagePicker from "expo-image-picker";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";

export class CameraPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.back,
      modalVisible: false
    };
  }

  static propTypes = {
    addPhoto: PropTypes.func.isRequired
  };

  async componentDidMount() {
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === "granted" });
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  handleCameraType = () => {
    const { cameraType } = this.state;

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      // console.log(photo);
      this.props.addPhoto(photo);
      this.setState({ modalVisible: true });
      setTimeout(() => this.setState({ modalVisible: false }), 500);
    }
  };

  render() {
    const { hasPermission, modalVisible } = this.state;
    if (hasPermission === null) {
      return <View></View>;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.cameraType}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <Link to="/" style={{ margin: 10 }}>
              <Ionicons
                name="ios-arrow-round-back"
                style={{ color: "#fff", fontSize: 50 }}
              />
            </Link>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              {/* <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent"
                }}
                onPress={() => this.pickImage()}
              >
                <Ionicons
                  name="ios-photos"
                  style={{ color: "#fff", fontSize: 40 }}
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                style={{
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  backgroundColor: "transparent"
                }}
                onPress={() => this.handleCameraType()}
              >
                <MaterialCommunityIcons
                  name="camera-switch"
                  style={{ color: "#fff", fontSize: 40, margin: 20 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  backgroundColor: "transparent"
                }}
                onPress={() => this.takePicture()}
              >
                <MaterialCommunityIcons
                  name="camera"
                  style={{ color: "#fff", fontSize: 40, margin: 20 }}
                />
              </TouchableOpacity>
            </View>
          </Camera>
          <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Photo taken</Text>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 50
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    textAlign: "center",
    justifyContent: "center"
  }
});

export default withRouter(connect(null, { addPhoto })(CameraPage));
