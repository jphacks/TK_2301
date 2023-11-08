import {
  doc,
  getFirestore,
  collection,
  getDocs,
  CollectionReference,
  DocumentData,
  getDoc,
  setDoc,
} from "firebase/firestore";
import {initializeFirebase} from "./init";
import firestore from "@react-native-firebase/firestore";
import {Scenario} from "src/models/scenario";

class ScenarioFirestore {
  //   async getScenarios(docId: string) {
  //     await firestore().collection("scenario").get();
  //   }

  //   async get(docId: string) {
  //     await firestore().collection("scenario").doc(docId).get();
  //   }

  async insert(scenario: Scenario) {
    await firestore().collection("scenario").add(scenario);
  }

  async update(docId: string, scenario: Scenario) {
    await firestore().collection("scenario").doc(docId).update(scenario);
  }
}

const scenarioCollection = new ScenarioFirestore();

export default scenarioCollection;
