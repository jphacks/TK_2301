import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {Scenario} from '../../models/scenario';
import {getStorage, ref, getDownloadURL} from 'firebase/storage';

class ScenarioFirestore {
  private firestore = getFirestore();

  async getAll() {
    const querySnapshot = await getDocs(collection(this.firestore, 'scenario'));
    querySnapshot.forEach(doc => {
      // console.log(doc.id, ' => ', doc.data());
    });
    return querySnapshot;
  }

  // TODO: 実装
  async get(docId: string) {
    const docRef = doc(this.firestore, 'scenario', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log(docId, '=>', docSnap.data());
    } else {
      console.log('No such document!');
    }
  }

  async insert(docId: string, scenario: Scenario) {
    const docRef = doc(this.firestore, 'scenario', docId);
    await setDoc(docRef, scenario);
  }

  async update(docId: string, scenario: Scenario) {
    const docRef = doc(this.firestore, 'scenario', docId);
    await updateDoc(docRef, scenario);
  }

  // stringまたは、errorを返す
  async getImageUrl(imagePath: string): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, imagePath);

    try {
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error('Error getting image URL: ', error);
      throw error; // またはエラーに応じた適切な処理を行う
    }
  }

  async getUserIconUrl(userId: string): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, `user_icons/${userId}.png`);
    
    const url = await getDownloadURL(storageRef);
    if (typeof(url) !== 'string') return 'https://firebasestorage.googleapis.com/v0/b/avocado-test-5e236.appspot.com/o/character_icons%2Fb.png?alt=media&token=038841ca-6718-4acc-bc2b-5bb943cb9297'

    return url;
  }
}

export function createScenarioFirestore() {
  return new ScenarioFirestore();
}
