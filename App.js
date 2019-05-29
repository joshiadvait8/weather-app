import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Keyboard
} from "react-native";
import { Input, Card, CardItem, Item, Button, Header, Body } from "native-base";

const APPID = "629437d3dfa2237e5739d49b693be7cc";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      weather: "Weather",
      temp: "",
      city: "",
      icon: "01d"
    };
  }

  getData = city => {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=629437d3dfa2237e5739d49b693be7cc&units=metric`;

    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          icon: responseJson.weather[0].icon,
          weather: responseJson.weather[0].main,
          temp: responseJson.main.temp
        });
        console.log(this.state.icon);
      })
      .catch(error => {
        console.log(error);
      });
  };
  componentWillMount() {}
  render() {
    if (this.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#192A56" }}>
        <View style={{ flex: 1, marginTop: 25, backgroundColor: "#FFF" }}>
          <Header style={{ backgroundColor: "#192A56" }}>
            <Body>
              <Text style={{ fontWeight: "bold", fontSize: 20, color: "#FFF" }}>
                Today's Weather
              </Text>
            </Body>
          </Header>
          <View style={{ marginTop: 20, marginHorizontal: 20 }}>
            <Item>
              <Input
                keyboardType={"default"}
                placeholder={"Enter your city"}
                autoFocus={true}
                placeholderTextColor={"#000"}
                onChangeText={city => this.setState({ city })}
              />
            </Item>
            <Button
              full
              rounded
              style={{ padding: 10, margin: 10, backgroundColor: "#192A56" }}
              onPress={() => {
                this.getData(this.state.city);
                Keyboard.dismiss();
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20, color: "#FFF" }}>
                Check Weather
              </Text>
            </Button>
            <Card style={{ marginTop: 20, padding: 10 }}>
              <CardItem>
                <View style={styles.container}>
                  <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                    {this.state.city}
                  </Text>

                  <Text style={{ fontWeight: "bold", fontSize: 40 }}>
                    {this.state.temp}&#x2103;
                  </Text>
                  <Text />
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{
                      uri: `http://openweathermap.org/img/w/${
                        this.state.icon
                      }.png`
                    }}
                  />
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    {this.state.weather}
                  </Text>
                </View>
              </CardItem>
            </Card>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  weatherContainer: {}
});
