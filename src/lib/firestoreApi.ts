import {
  getDocs,
  collection,
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore'
import { firebaseDb } from './firebase'

export type Note = {
  id?: string
  name: string
  uid: string
  createdAt: Date | Timestamp
}

const noteConverter: FirestoreDataConverter<Note> = {
  toFirestore(note: Note): DocumentData {
    return {
      name: note.name,
      uid: note.uid,
      createdAt: note.createdAt,
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<Note>, options?: SnapshotOptions): Note {
    const data = snapshot.data(options)
    if (data.createdAt instanceof Timestamp) {
      return {
        id: snapshot.id,
        name: data.name,
        uid: data.uid,
        createdAt: data.createdAt.toDate(),
      }
    }
  },
}

export const getNotes = async () => {
  const collRef = collection(firebaseDb, 'notes').withConverter(noteConverter)
  const snapShot = await getDocs(collRef)
  return snapShot.docs.map((doc) => doc.data())
}
