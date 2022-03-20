import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Post from "./Post";

function Posts(props) {
  const [realtimePosts, loading, error] = useCollection(
    query(collection(db, "posts"), orderBy("timestamp", "desc"))
  );

  // const items = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  // onSnapshot(items, (querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.data().message);
  //   });
  // });

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {realtimePosts &&
        realtimePosts.docs.map((post) => (
          <Post
            key={post.id}
            name={post.data().name}
            message={post.data().message}
            email={post.data().email}
            timestamp={post.data().timestamp}
            image={post.data().image}
            postImage={post.data().postImage}
          />
        ))}
    </div>
  );
}

export default Posts;
