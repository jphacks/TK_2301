import React, { useRef, useState, useEffect } from "react"
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { PermissionsAndroid, Platform } from "react-native"
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType
} from "react-native-agora"
import AgoraPresenter from "./AgoraPresenter"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootRoutesParamList } from "../../routes/Root"

type Props = NativeStackScreenProps<RootRoutesParamList, "Agora">

const appId = "f414351ba24f42deab25547937b7c797"
const channelName = "test" // rustサーバーから受け取るroomIDにする
const token =
  "007eJxTYOi4+7Z4O1P1EZ+DanyS51YdnHxsxzvP6R+8J3zZ+UQmK81CgSHNxNDE2NQwKdHIJM3EKCU1McnI1NTE3NLYPMk82dzS3HqafmpDICPD3sx2BkYoBPFZGEpSi0sYGADdpCDU"
const uid = 1 // rustサーバーから受け取るuserIDにする

const Agora: React.FC<Props> = () => {
  const agoraEngineRef = useRef<IRtcEngine>() // Agora engine instance
  const [isJoined, setIsJoined] = useState(false) // Indicates if the local user has joined the channel
  const [remoteUid, setRemoteUid] = useState(0) // Uid of the remote user
  const [message, setMessage] = useState("") // Message to the user

  function showMessage(msg: string) {
    setMessage(msg)
  }

  const getPermission = async () => {
    if (Platform.OS === "android") {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA
      ])
    }
  }

  useEffect(() => {
    // Initialize Agora engine when the app starts
    setupVideoSDKEngine()
  }, [])

  //
  const setupVideoSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === "android") {
        await getPermission()
      }
      agoraEngineRef.current = createAgoraRtcEngine()
      const agoraEngine = agoraEngineRef.current
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting
      })
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage("Successfully joined the channel " + channelName)
          setIsJoined(true)
        },
        onUserJoined: (_connection, Uid) => {
          showMessage("Remote user joined with uid " + Uid)
          setRemoteUid(Uid)
        },
        onUserOffline: (_connection, Uid) => {
          showMessage("Remote user left the channel. uid: " + Uid)
          setRemoteUid(0)
        }
      })
      agoraEngine.enableVideo()
    } catch (e) {
      console.log(e)
    }
  }

  const join = async () => {
    if (isJoined) {
      return
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication
      )
      agoraEngineRef.current?.startPreview()
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster
      })
    } catch (e) {
      console.log(e)
    }
  }

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel()
      setRemoteUid(0)
      setIsJoined(false)
      showMessage("You left the channel")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <AgoraPresenter
      isJoined={isJoined}
      remoteUid={remoteUid}
      uid={uid}
      message={message}
      join={join}
      leave={leave}
    />
  )
}

export default Agora
