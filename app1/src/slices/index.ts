import { postsSliceReducer } from "./posts.slice";
import { addReducer } from "state/store";

addReducer("posts", postsSliceReducer);

