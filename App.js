import { StatusBar } from "expo-status-bar";

import AuthScreen from "./src/views/AuthScreen";

export default function App() {

  return (
    <>

      <StatusBar
        style="dark"
      />

      <AuthScreen />

    </>
  );

}