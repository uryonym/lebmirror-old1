import {
  getDocs,
  collection,
  query,
  where,
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

export type Section = {
  id?: string
  name: string
  noteId: string
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

const sectionConverter: FirestoreDataConverter<Section> = {
  toFirestore(section: Section): DocumentData {
    return {
      name: section.name,
      noteId: section.noteId,
      createdAt: section.createdAt,
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<Section>, options?: SnapshotOptions): Section {
    const data = snapshot.data(options)
    if (data.createdAt instanceof Timestamp) {
      return {
        id: snapshot.id,
        name: data.name,
        noteId: data.noteId,
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

export const getSections = async (noteId: string) => {
  const collRef = collection(firebaseDb, 'sections').withConverter(sectionConverter)
  const q = query(collRef, where('noteId', '==', noteId))
  const snapShot = await getDocs(q)
  return snapShot.docs.map((doc) => doc.data())
}
