import { StatusBar } from "expo-status-bar";

import AuthScreen from "./src/views/AuthScreen";

import HomeScreen from "./src/views/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/navigation/MainNavigator";

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <MainNavigator />
    </NavigationContainer>
  );

}