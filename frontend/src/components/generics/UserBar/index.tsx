import React, { useEffect } from "react"
import UserBarPresenter from "./presenter"
import storage from "@react-native-firebase/storage"
import { User } from "../../../type"

export type Props = {
  user: User
}

const UserBar = ({ user }: Props) => {
  const [icon, setIcon] = React.useState<string>("")

  useEffect(() => {
    console.log(
      `gs://avocado-test-5e236.appspot.com/user_icons/${user.user_id}.png`
    )
    const getUrl = async () => {
      await storage()
        .ref(`user_icons/${user.user_id}.png`)
        .getDownloadURL()
        .then((url) => {
          setIcon(url)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getUrl()
  }, [user])

  return <UserBarPresenter icon={icon} name={user.user_name} />
}

export default UserBar
