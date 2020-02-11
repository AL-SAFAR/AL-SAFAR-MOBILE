import React, { Component } from "react";
import { Text, View } from "react-native";

export default class temp extends Component {
  render() {
    return (
      <GoogleAutoComplete apiKey={API_KEY} debounce={500} minLength={3}>
        {({
          handleTextChange,
          locationResults,
          fetchDetails,
          isSearching,
          inputValue,
          clearSearchs
        }) => (
          <Fragment>
            <TouchableOpacity
              onPress={() => {
                // cb();
              }}
              style={styles.container}
            >
              <View style={styles.leftCol}>
                <Text style={{ color: "#0099FF", fontSize: 10 }}>
                  {"\u25A0"}
                </Text>
              </View>
              <View style={styles.centerCol}>
                <TextInput
                  placeholder="Where To?"
                  style={{
                    fontFamily: "sans-serif-thin",
                    fontSize: 21,
                    color: "#545454"
                  }}
                  onChangeText={handleTextChange}
                  value={inputValue}
                />
              </View>
              <View style={styles.rightCol}>
                <Ionicons
                  name="md-car"
                  color="#0099FF"
                  size={25}
                  style={{ alignSelf: "center" }}
                />
              </View>
              {isSearching && <ActivityIndicator size="large" color="red" />}
              <ScrollView>
                {locationResults.map(el => (
                  <LocationItem
                    {...el}
                    key={el.id}
                    fetchDetails={fetchDetails}
                  />
                ))}
              </ScrollView>
            </TouchableOpacity>
          </Fragment>
        )}
      </GoogleAutoComplete>
    );
  }
}
