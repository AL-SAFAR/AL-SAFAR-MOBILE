import React, { useEffect } from "react";
import { View, SafeAreaView, Text, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Agent from "./components/Travel/Agent";
import { globalStyles } from "../../styles/global";
import {
  getAgents,
  filterAgents,
  chargeCustomer,
} from "./actions/agentActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "./components/layout/Loader";
import SearchBar from "./components/layout/SearchBar";

const TravelAgent = ({
  navigation,
  agent: { agents, loading, filtered },
  getAgents,
  chargeCustomer,
  filterAgents,
}) => {
  const renderAgents = () => {
    return agents.map((agent) => {
      return (
        <Agent
          key={agent._id}
          agent={agent}
          navigation={navigation}
          chargeCustomer={chargeCustomer}
        />
      );
    });
  };

  const filteredAgents = () => {
    return filtered.map((agent) => {
      return (
        <Agent
          key={agent._id}
          agent={agent}
          navigation={navigation}
          chargeCustomer={chargeCustomer}
        />
      );
    });
  };

  useEffect(() => {
    getAgents();
    //eslint-disable-next-line
  }, []);
  if (loading || agents === null) {
    return <Loader />;
  }
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <SearchBar search={filterAgents} />
        <Text
          style={{
            paddingHorizontal: 20,
            marginVertical: 10,
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          Looking for Someone Who can book for you?
        </Text>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {filtered !== null ? filteredAgents() : renderAgents()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

TravelAgent.propTypes = {
  agent: PropTypes.object.isRequired,
  getAgents: PropTypes.func.isRequired,
  chargeCustomer: PropTypes.func.isRequired,
  filterAgents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  agent: state.agent,
});

export default connect(mapStateToProps, {
  chargeCustomer,
  getAgents,
  filterAgents,
})(TravelAgent);
