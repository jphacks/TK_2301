import firestore from '@react-native-firebase/firestore';
import {Scenario} from '../../models/scenario';
import storage from '@react-native-firebase/storage';

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

  // stringまたは、errorを返す
  async getImageUrl(imagePath: string): Promise<string> {
    return await storage()
      .ref(imagePath)
      .getDownloadURL()
      .then(url => {
        return url;
      });
  }

  async getUserIconUrl(userId: string): Promise<string> {
    return await storage()
      .ref(`user_icons/${userId}.png`)
      .getDownloadURL()
      .then(url => {
        return url;
      });
  }
}

const scenarioCollection = new ScenarioFirestore();

export default scenarioCollection;
