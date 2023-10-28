import React, { FC } from "react"
import type { RootRoutesParamList } from "../../routes/Root"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import EventRoomPresenter from "./presenter"

type Props = NativeStackScreenProps<RootRoutesParamList, "EventRoomPage">
export const EventRoomPage: FC<Props> = () => {
  return <EventRoomPresenter />
}
