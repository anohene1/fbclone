import { useSession } from "next-auth/react";
import Image from "next/image";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import {
  serverTimestamp,
  addDoc,
  collection,
  setDoc,
} from "firebase/firestore";

function InputBox(props) {
  const { data: session } = useSession();
  const inputRef = useRef();
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  async function sendPost(event) {
    event.preventDefault();

    if (!inputRef.current.value) return;

    await addDoc(collection(db, "posts"), {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp(),
    }).then((doc) => {
      if (imageToPost) {
        const storageRef = ref(storage, `posts/${doc.id}`);

        uploadString(storageRef, imageToPost, "data_url").then((snapshot) => {
          console.log("uploaded an image");
          getDownloadURL(snapshot.ref).then((downloadUrl) => {
            console.log("file available at: ", downloadUrl);
            setDoc(doc, { postImage: downloadUrl }, { merge: true });
          });
        });
      }
    });

    inputRef.current.value = "";
    setImageToPost(null);
  }

  function addImageToPost(event) {
    const reader = new FileReader();

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  }

  function removeImage() {
    setImageToPost(null);
  }

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          src={session.user.image}
          className="rounded-full"
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind, ${session.user.name}?`}
          />
          <button className="hidden" onClick={sendPost}>
            Submit
          </button>
          {imageToPost && (
            <div
              onClick={removeImage}
              className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
            >
              <img src={imageToPost} alt="" className="h-10 object-contain" />
              <p className="text-xs text-red-500 text-center">Remove</p>
            </div>
          )}
        </form>
      </div>
      <div className="flex justify-evenly p-3 border-1 ">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div
          onClick={() => filePickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filePickerRef}
            onChange={addImageToPost}
            type="file"
            hidden
          />
        </div>

        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
