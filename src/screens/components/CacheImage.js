import React from "react";
import { Image } from "react-native";
import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";
export default class CacheImage extends React.Component {
  state = {
    source: null,
  };

  componentDidMount = async () => {
    const { uri } = this.props;
    const name = shorthash.unique(uri);
    console.log(name);
    const path = `${FileSystem.cacheDirectory}${name}`;
    const image = await FileSystem.getInfoAsync(path);
    console.log("path: " + path);
    // console.log("Image: " + image.exists);
    if (image.exists) {
      console.log("read image from cache");
      this.setState({
        source: {
          uri: image.uri,
        },
      });
      return;
    }

    console.log("downloading image to cache");
    FileSystem.downloadAsync(uri, path)
      .then(({ uri }) => {
        console.log("Finished downloading to ", uri);
      })
      .catch((error) => {
        console.error(error);
      });
    // this.setState({
    //   source: {
    //     uri: newImage.uri,
    //   },
    // });
  };

  render() {
    return <Image style={this.props.style} source={this.state.source} />;
  }
}
