import firestore from '@react-native-firebase/firestore';
import {Scenario} from '../../models/scenario';

class ScenarioFirestore {
  // TODO: 実装
  async get(docId: string) {
    await firestore().collection('scenario').doc(docId).get();
  }

  async insert(docId: string, scenario: Scenario) {
    await firestore().collection('scenario').doc(docId).set(scenario);
  }

  async update(docId: string, scenario: Scenario) {
    await firestore().collection('scenario').doc(docId).update(scenario);
  }
}

const scenarioCollection = new ScenarioFirestore();

export default scenarioCollection;
