import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  FirestoreDataConverter,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
  where,
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

export type Page = {
  id?: string
  name: string
  content: string
  sectionId: string
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

const pageConverter: FirestoreDataConverter<Page> = {
  toFirestore(page: Page): DocumentData {
    return {
      name: page.name,
      content: page.content,
      sectionId: page.sectionId,
      createdAt: page.createdAt,
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<Page>, options?: SnapshotOptions): Page {
    const data = snapshot.data(options)
    if (data.createdAt instanceof Timestamp) {
      return {
        id: snapshot.id,
        name: data.name,
        content: data.content,
        sectionId: data.sectionId,
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

export const addNote = async (note: Note) => {
  const collRef = collection(firebaseDb, 'notes').withConverter(noteConverter)
  const docRef = await addDoc(collRef, note)
  const doc = await getDoc(docRef.withConverter(noteConverter))
  return doc.data()
}

export const deleteNote = async (noteId: string) => {
  const docRef = doc(firebaseDb, 'notes', noteId)
  await deleteDoc(docRef)
}

export const getSections = async (noteId: string) => {
  const collRef = collection(firebaseDb, 'sections').withConverter(sectionConverter)
  const q = query(collRef, where('noteId', '==', noteId))
  const snapShot = await getDocs(q)
  return snapShot.docs.map((doc) => doc.data())
}

export const addSection = async (section: Section) => {
  const collRef = collection(firebaseDb, 'sections').withConverter(sectionConverter)
  const docRef = await addDoc(collRef, section)
  const doc = await getDoc(docRef.withConverter(sectionConverter))
  return doc.data()
}

export const deleteSection = async (sectionId: string) => {
  const docRef = doc(firebaseDb, 'sections', sectionId)
  await deleteDoc(docRef)
}

export const getPages = async (sectionId: string) => {
  const collRef = collection(firebaseDb, 'pages').withConverter(pageConverter)
  const q = query(collRef, where('sectionId', '==', sectionId))
  const snapShot = await getDocs(q)
  return snapShot.docs.map((doc) => doc.data())
}

export const addPage = async (page: Page) => {
  const collRef = collection(firebaseDb, 'pages').withConverter(pageConverter)
  const docRef = await addDoc(collRef, page)
  const doc = await getDoc(docRef.withConverter(pageConverter))
  return doc.data()
}

export const deletePage = async (pageId: string) => {
  const docRef = doc(firebaseDb, 'pages', pageId)
  await deleteDoc(docRef)
}
