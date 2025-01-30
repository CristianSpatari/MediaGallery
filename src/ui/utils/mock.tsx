import { FolderItem, MediaItem } from "./types";

export const mockMediaData: MediaItem[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1735977479864-d8a2612cee6d?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Nature",
    width: 2000,
    height: 100,
    type: "image",
    extension: "jpeg",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1737995720044-8d9bd388ff4f?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Dogs",
    width: 1100,
    height: 733,
    type: "image",
    extension: "jpeg",
  },
  {
    id: "3",
    src: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2h3MnUzaWxzcWxqdGFkcHh5ODdqbTFmaW16cmcxOHhzZjVsNDlvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3nbxypT20Ulmo/giphy.gif",
    label: "Cat",
    width: 300,
    height: 300,
    type: "gif",
    extension: "gif",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1737995719869-facbf38f5348?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Dog",
    width: 1024,
    height: 683,
    type: "image",
    extension: "jpeg",
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1737270019710-62b36a249aca?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Radio_station",
    width: 1400,
    height: 933,
    type: "image",
    extension: "png",
  },
  {
    id: "5",
    src: "",
    label: "API with video not found :(",
    width: 1400,
    height: 933,
    type: "video",
    extension: "mp4",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1737859682164-f949f037db5f?q=80&w=3136&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Bird",
    width: 1300,
    height: 867,
    type: "image",
    extension: "png",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1737962414798-6dec38031121?q=80&w=2280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Cola",
    width: 1200,
    height: 2000,
    type: "image",
    extension: "jpeg",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1732282602306-fe466828e1e8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Sea",
    width: 900,
    height: 600,
    type: "image",
    extension: "jpeg",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1737602902540-6211385c19bc?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Cute",
    width: 1500,
    height: 1000,
    type: "image",
    extension: "jpeg",
  },
  {
    id: "10",
    src: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzgzeXdqcnp1Mmt0dWVjeHA4d2o4Nzk3ZjFmcXJ3N3FnaXlpbjhncSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tHIRLHtNwxpjIFqPdV/giphy.gif",
    label: "You",
    width: 1500,
    height: 900,
    type: "gif",
    extension: "gif",
  },
];
export const mockFolderData: FolderItem[] = [
  {
    id: "1",
    label: "Your folder",
    mediaId: ["1", "2", "3"],
  },
  {
    id: "2",
    label: "My folder",
    mediaId: ["4", "5", "6", "7"],
  },
  {
    id: "3",
    label: "Our folder",
    mediaId: [],
  },
];

// export const folderItems: Item[] = [
//   {
//     id: "1",
//     icon: <BsFolder2Open />,
//     label: "Your folder",
//     count: 4,
//     selected: true,
//   },
//   { id: "2", icon: <BsFolder2Open />, label: "Your folder" },
// ];

// export const filterItems: Item[] = [
//   {
//     id: "1",
//     icon: <PiImageSquareThin />,
//     label: "Images",
//     count: 4,
//     isCheckbox: true,
//   },
//   { id: "2", icon: <VscPlay />, isCheckbox: true, label: "Videos" },
//   { id: "3", icon: <PiGif />, isCheckbox: true, label: "Gifs" },
// ];
