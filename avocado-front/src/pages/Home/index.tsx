import React, { FC } from "react"
import { Text, Button } from "react-native"
import type { RootRoutesParamList } from "../../routes/Root"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"

type Props = NativeStackScreenProps<RootRoutesParamList, "HomePage">
export const HomePage: FC<Props> = ({ navigation }) => {
  return (
    <>
      <Text>HOME</Text>
      <Button
        onPress={() => navigation.push("DetailPage")}
        title="Settings page"
      />
      <Button
        onPress={() => navigation.push("VoiceChatPage")}
        title="VoiceChat page"
      />
      <Button onPress={() => navigation.push("LoginPage")} title="Login" />
      <Button onPress={() => navigation.push("Agora")} title="Agora" />
      <Button
        onPress={() => navigation.push("EventRoomPage")}
        title="EventRoom"
      />
      <Button
        onPress={() => navigation.push("ScenarioSelectionPage")}
        title="ScenarioSelection"
      />
      <Button onPress={() => navigation.push("Agora")} title="Agora" />
      <Button
        onPress={() => navigation.push("ServerSelect")}
        title="ServerSelect"
      />
    </>
  )
}
