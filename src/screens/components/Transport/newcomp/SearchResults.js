import React from 'react'
import { Dimensions, StyleSheet, Text, ScrollView } from 'react-native'
import { View, List, ListItem, Left, Body } from "native-base";
import {
    MaterialIcons as MIcon,
} from "@expo/vector-icons";
import { getSelectedAddress } from '../../../actions/transportActions';
// import { ScrollView } from 'react-native-gesture-handler';


const width = Dimensions.get("window").width;
const SearchResults = ({
    predictions, fetchDetails, getSelectedAddress
}) => {

    const handleSelectedAddress = async (placeID) => {
// console.log(placeID)
        const res = await fetchDetails(placeID)
        getSelectedAddress(res);
    }
    return (
        <View style={styles.searchResultsWrapper} >
            <List>
                {/* {console.log(predictions)} */}
                {/* dataArray={predictions}
                 renderRow={(item) =>
                    <View> */}
                <ScrollView>

                    {(predictions.length !== 0) &&
                        predictions.map(el => {
                            return (
                                <ListItem
                                    key={el.id}
                                    onPress={() => handleSelectedAddress(el.place_id)}
                                    button avatar>
                                    <Left style={styles.leftContainer}>
                                        <MIcon style={styles.leftIcon} name="location-on" color="#0099ff" />
                                    </Left>
                                    <Body>
                                        <Text style={styles.primaryText}>
                                            {el.structured_formatting.main_text}
                                        </Text>
                                        <Text style={styles.secondaryText}>
                                            {el.structured_formatting.secondary_text}
                                        </Text>
                                    </Body>
                                </ListItem>
                            )
                        })
                    }
                </ScrollView>

                {/* </View> */}
            </List>
            {/* <List
                dataArray={predictions}
                renderRow={(item) =>
                    <View >
                        <ListItem
                            // onPress={() => handleSelectedAddress(item.placeID)}
                            button avatar>
                            {console.log(item)}
                            <Left style={styles.leftContainer}>
                                <MIcon style={styles.leftIcon} name="location-on" />
                            </Left>
                            <Body>
                                <Text style={styles.primaryText}>
                                    {item.structured_formatting.main_text}
                                </Text>
                                <Text style={styles.secondaryText}>
                                    {item.structured_formatting.secondary_text}
                                </Text>
                            </Body>
                        </ListItem>

                    </View>
                }
            // (predictions.length !== 0) &&

            />
         */}
        </View>

    )
}
// const hei = locationResults.length * 40;
const styles = StyleSheet.create({
    searchResultsWrapper: {
        top: 230,
        position: "absolute",
        width: width,
        height: 1000,
        backgroundColor: "#fff",
        opacity: 0.9
    },
    primaryText: {
        fontWeight: "bold",
        color: "#373737"
    },
    secondaryText: {
        fontStyle: "italic",
        color: "#7D7D7D",
    },
    leftContainer: {
        flexWrap: "wrap",
        alignItems: "flex-start",
        borderLeftColor: "#7D7D7D",
    },
    leftIcon: {
        fontSize: 20,
        color: "#7D7D7D",
    },
    distance: {
        fontSize: 12,
    }
})

export default SearchResults
