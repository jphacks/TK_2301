import React, { FC, useEffect, useRef, useState } from "react"
import type { RootRoutesParamList } from "../../routes/Root"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ServerSelectPagePresenter } from "./presenter"
import { Text } from "react-native"
import auth from "@react-native-firebase/auth"
import { AuthError } from "../../api/firebase/error"
import { useUser } from "../../context/user.context"
import { Room } from "../../type"
import { useSocket } from "../../context/socket.context"

export type Props = NativeStackScreenProps<RootRoutesParamList, "ServerSelect">
export const ServerSelectPage: FC<Props> = ({ navigation }) => {
  const [receivedMessage, setReceivedMessage] = useState<string>("")
  const [isInitializedFirebase, setIsInitializedFirebase] = useState(false)
  const { user, setUser } = useUser()
  const { socketRef, rooms } = useSocket()
  console.log(rooms)

  useEffect(() => {
    auth()
      .signInWithEmailAndPassword("test@gmail.com", "testtest")
      .then((credential) => {
        console.log("SUCCESS: signed in")
        setUser({
          name: credential.user.displayName,
          email: credential.user.email,
          uid: credential.user?.uid
        })
      })
      .catch((error) => {
        if (error.code === AuthError.InvalidEmail) {
          console.log("invalid email")
        }

        if (error.code === AuthError.UserDisabled) {
          console.log("user disabled")
        }

        if (error.code === AuthError.UserNotFound) {
          console.log("user not found")
        }

        if (error.code === AuthError.WrongPassword) {
          console.log("wrong password")
        }

        console.error(error)
      })
  }, [])

  const onPress = () => {
    navigation.navigate("ScenarioSelectionPage")
  }
  return (
    <>
      {socketRef.current ? (
        <ServerSelectPagePresenter
          onPress={onPress}
          rooms={rooms}
          navigation={navigation}
        />
      ) : (
        <Text>loading...</Text>
      )}
    </>
  )
}
