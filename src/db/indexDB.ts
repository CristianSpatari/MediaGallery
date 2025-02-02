import { TDBType } from "../ui/utils/types";

const DB_NAME = "MediaDatabase";
const DB_VERSION = 1;
const MEDIA_STORE = "media";
const FOLDER_STORE = "folder";

type Folder = {
  id: string;
  mediaId: string[];
};

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(MEDIA_STORE)) {
        db.createObjectStore(MEDIA_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(FOLDER_STORE)) {
        db.createObjectStore(FOLDER_STORE, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getStore(storeName: TDBType, mode: IDBTransactionMode) {
  const db = await openDB();
  return db.transaction(storeName, mode).objectStore(storeName);
}

export async function addData(storeName: TDBType, data: any) {
  try {
    if (!data.id) data.id = crypto.randomUUID();
    const store = await getStore(storeName, "readwrite");
    await store.put(data);
    console.log(`Data added to ${storeName}:`, data);
  } catch (error) {
    console.error(`Error adding data to ${storeName}:`, error);
  }
}

export async function getAllData<T = unknown>(
  storeName: TDBType,
): Promise<unknown> {
  try {
    const store = await getStore(storeName, "readonly");
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result as T[]);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`Error fetching data from ${storeName}:`, error);
    return [];
  }
}

async function getFolder(folderId: string): Promise<unknown> {
  const store = await getStore(FOLDER_STORE, "readonly");
  return new Promise((resolve, reject) => {
    const request = store.get(folderId);
    request.onsuccess = () => resolve(request.result as Folder | null);
    request.onerror = () => reject(null);
  });
}

async function updateFolder(folder: Folder) {
  const store = await getStore(FOLDER_STORE, "readwrite");
  await store.put(folder);
}

export async function addMediaToFolder(
  folderId: string,
  newMediaIds: string[],
) {
  try {
    const folder = await getFolder(folderId);
    console.log("folder: ", folder);
    if (!folder) return console.error(`Folder with ID ${folderId} not found.`);

    const filteredNewMediaIds = newMediaIds.filter(
      (id) => !folder.mediaId.includes(id),
    );
    if (!filteredNewMediaIds.length)
      return console.log(`No new media to add to folder ${folderId}.`);

    folder.mediaId.push(...filteredNewMediaIds);
    await updateFolder(folder as Folder);
    console.log(`Updated folder ${folderId}:`, folder);
  } catch (error) {
    console.error(`Error adding media to folder ${folderId}:`, error);
  }
}

export async function removeMediaFromFolder(
  folderId: string,
  mediaIdsToRemove: string[],
) {
  try {
    const folder = await getFolder(folderId);
    if (!folder) return console.error(`Folder with ID ${folderId} not found.`);

    const updatedMediaIds = folder.mediaId.filter(
      (id) => !mediaIdsToRemove.includes(id),
    );
    if (updatedMediaIds.length === folder.mediaId.length) {
      return console.log(
        `No matching media IDs to remove from folder ${folderId}.`,
      );
    }

    folder.mediaId = updatedMediaIds;
    await updateFolder(folder as Folder);
    console.log(`Updated folder ${folderId}:`, folder);
  } catch (error) {
    console.error(`Error removing media from folder ${folderId}:`, error);
  }
}

export async function updateLabelInStore(
  storeName: TDBType,
  id: string,
  newLabel: string,
) {
  try {
    const store = await getStore(storeName, "readwrite");
    const request = store.get(id);
    request.onsuccess = () => {
      const item = request.result;
      if (!item)
        return console.error(`Item with ID ${id} not found in ${storeName}.`);

      item.label = newLabel;
      store.put(item);
      console.log(`Updated ${storeName} with new label for ID ${id}:`, item);
    };
    request.onerror = () =>
      console.error(`Error retrieving item with ID ${id} from ${storeName}`);
  } catch (error) {
    console.error(`Error updating label in ${storeName}:`, error);
  }
}

export async function deleteMediaById(id: string) {
  try {
    const store = await getStore("media", "readwrite");
    await store.delete(id);
    console.log(`Data with ID ${id} deleted from media`);
  } catch (error) {
    console.error(`Error deleting data from media:`, error);
  }
}
