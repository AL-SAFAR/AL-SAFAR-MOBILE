import { FooterTab, Footer, Button } from 'native-base';
import React from 'react'
import { StyleSheet, Text, StatusBar } from 'react-native'
import {
    // FontAwesome as FIcon,
    MaterialCommunityIcons as MCIcon
} from "@expo/vector-icons";

const FooterComponent = () => {
    //tab bar items
    const cars = [{
        title: "Car",
        subTitle: "",
        icon: "car"
    },

    {
        title: "Premium",
        subTitle: "",
        icon: "car-sports"
    },
    {
        title: "Jeep",
        subTitle: "",
        icon: "jeepney"
    },
    {
        title: "Bike",
        subTitle: "",
        icon: "motorbike"
    }];
    return (
        <Footer>
            <FooterTab style={styles.footerContainer} >

                {
                    cars.map((obj, index) => {
                        return (
                            <Button key={index}>
                                <MCIcon size={20} name={obj.icon} color={(index === 0) ? "#0099ff" : "grey"} />
                                <Text style={{ fontSize: 12, color: (index === 0) ? "#0099ff" : "grey" }}>{obj.title}</Text>
                                <Text style={styles.subText}>{obj.subTitle}</Text>
                            </Button>

                        )
                    })
                }

            </FooterTab>
        </Footer>)
}
const styles = StyleSheet.create({
    footerContainer: {
        backgroundColor: "#fff",
    },
    subText: {
        fontSize: 8
    }
})

export default FooterComponent

