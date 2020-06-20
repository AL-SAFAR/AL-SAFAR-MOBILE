import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeNavigation from "../HomeNavigation";
import TrackDriver from "../../components/Transport/newcomp/components/TrackDriver/TrackDriver";
import Chat from "../../components/Chat/Chat";

// import Hotel from "../../components/Hotel/Hotel";
const screens = {
  HomeNavigation: {
    screen: HomeNavigation,
    navigationOptions: {
      headerShown: false,
    },
  },
  TrackDriver: {
    screen: TrackDriver,
    navigationOptions: {
      headerShown: false,
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
      headerShown: false,
    },
  },
};

const TransportStack = createStackNavigator(screens);

export default createAppContainer(TransportStack);
