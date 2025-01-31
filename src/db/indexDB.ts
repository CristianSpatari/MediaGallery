import { TDBType } from "../ui/utils/types";

const DB_NAME = "MediaDatabase";
const DB_VERSION = 1;
const MEDIA_STORE = "media";
const FOLDER_STORE = "folder";

export function openDB(): Promise<IDBDatabase> {
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

export async function addData(storeName: TDBType, data: any) {
  try {
    const db = await openDB();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    if (!data.id) {
      data.id = crypto.randomUUID();
    }

    await store.put(data);
    await tx.done;
    console.log(`Data added to ${storeName}:`, data);
  } catch (error) {
    console.error(`Error adding data to ${storeName}:`, error);
  }
}

export async function getAllData<T = unknown>(
  storeName: TDBType,
): Promise<unknown> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result as T[]);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`Error fetching data from ${storeName}:`, error);
    return [];
  }
}

export async function addMediaToFolder(
  folderId: string,
  newMediaIds: string[],
): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(FOLDER_STORE, "readwrite");
    const store = tx.objectStore(FOLDER_STORE);

    const request = store.get(folderId);

    request.onsuccess = async () => {
      const folder = request.result;
      if (!folder) {
        console.error(`Folder with ID ${folderId} not found.`);
        return;
      }

      const filteredNewMediaIds = newMediaIds.filter(
        (id) => !folder.mediaId.includes(id),
      );

      if (filteredNewMediaIds.length === 0) {
        console.log(`No new media to add to folder ${folderId}.`);
        return;
      }

      folder.mediaId = [...folder.mediaId, ...filteredNewMediaIds];

      await store.put(folder);
      await tx.done;

      console.log(`Updated folder ${folderId}:`, folder);
    };

    request.onerror = () => {
      console.error(`Error retrieving folder with ID ${folderId}`);
    };
  } catch (error) {
    console.error(`Error adding media to folder ${folderId}:`, error);
  }
}

export async function removeMediaFromFolder(
  folderId: string,
  mediaIdsToRemove: string[],
): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(FOLDER_STORE, "readwrite");
    const store = tx.objectStore(FOLDER_STORE);

    const request = store.get(folderId);

    request.onsuccess = async () => {
      const folder = request.result;
      if (!folder) {
        console.error(`Folder with ID ${folderId} not found.`);
        return;
      }

      const updatedMediaIds = folder.mediaId.filter(
        (id) => !mediaIdsToRemove.includes(id),
      );

      if (updatedMediaIds.length === folder.mediaId.length) {
        console.log(`No matching media IDs to remove from folder ${folderId}.`);
        return;
      }

      folder.mediaId = updatedMediaIds;
      await store.put(folder);
      await tx.done;

      console.log(`Updated folder ${folderId}:`, folder);
    };

    request.onerror = () => {
      console.error(`Error retrieving folder with ID ${folderId}`);
    };
  } catch (error) {
    console.error(`Error removing media from folder ${folderId}:`, error);
  }
}

export async function updateLabelInStore(
  storeName: TDBType,
  id: string,
  newLabel: string,
): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    const request = store.get(id);

    request.onsuccess = async () => {
      const item = request.result;
      if (!item) {
        console.error(`Item with ID ${id} not found in ${storeName}.`);
        return;
      }

      item.label = newLabel;

      const updateRequest = store.put(item);
      updateRequest.onsuccess = () => {
        console.log(`Updated ${storeName} with new label for ID ${id}:`, item);
      };

      updateRequest.onerror = () => {
        console.error(`Error updating label in ${storeName} for ID ${id}`);
      };

      await tx.done;
    };

    request.onerror = () => {
      console.error(`Error retrieving item with ID ${id} from ${storeName}`);
    };
  } catch (error) {
    console.error(`Error updating label in ${storeName}:`, error);
  }
}

export async function deleteData(
  storeName: TDBType,
  id: string,
): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    await store.delete(id);
    await tx.done;
    console.log(`Data with ID ${id} deleted from ${storeName}`);
  } catch (error) {
    console.error(`Error deleting data from ${storeName}:`, error);
  }
}
