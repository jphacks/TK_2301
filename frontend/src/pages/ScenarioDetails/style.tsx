import { StyleSheet } from "react-native"
import { colorCode, staticSizeValue } from "../../styles/general"

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16
  },
  image: {
    width: "100%"
  },
  card: {
    paddingLeft: 16,
    paddingVertical: 24
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    paddingTop: 8,
    paddingBottom: 4
  },
  evaluation: {
    flexDirection: "row"
  },
  rating: {
    fontSize: 11,
    color: "#FFC148",
    paddingRight: 4
  },
  info: {
    flexDirection: "row",
    paddingTop: 4
  },
  infoText: {
    fontSize: 13,
    color: "#DADEE1"
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#6b6c78"
  },
  author: {
    flexDirection: "row",
    alignItems: "center"
  },
  authorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 8
  },
  authorIcon: {
    width: 32,
    height: 32
  },
  purpleButton: {},
  outline: {
    paddingVertical: 24
  },
  outlineText: {
    fontSize: 13,
    color: "#ffffff"
  },
  scenarioFlowContainer: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    paddingBottom: 16
  },
  scenarioFlow: {},
  scenarioFlowText: {
    fontSize: 13,
    color: "#ffffff",
    paddingVertical: 1
  },
  serverCard: {
    marginBottom: 24
  },
  primaryButton: {
    marginBottom: 24
  },
  impressionContainer: {
    borderBottomColor: "#6b6c78",
    borderBottomWidth: 1
  },
  impressionCard: {
    marginBottom: 24
  }
})

export default styles
