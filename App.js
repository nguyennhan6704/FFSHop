import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AuthScreen from "./src/views/AuthScreen";
import MainNavigator from "./src/navigation/MainNavigator";
import AuthViewModels from "./src/viewmodels/AuthViewModels";

export default function App() {

  //Start khai báo

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  //End khai báo

  //Start function checkUser
  useEffect(() => {
    const checkUser = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(await AuthViewModels.getCurrentUserData());
      }
      else {
        setUser(null);
      }
      setLoading(false);
    });
    return checkUser;
  }, [])
  //End function checkUser

  //Start UI
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        {user ? (
          <MainNavigator />
        ) : (
          <AuthScreen />
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
  //End UI
}