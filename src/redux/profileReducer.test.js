import {addPost, deletePost, profileReducer} from "./profileReducer";

let initialState = {
  PostsData: [
    {
      id: 1,
      text: "test1",
      likesCount: 23
    },
    {
      id: 2,
      text: "test2",
      likesCount: 11
    },
  ]
}

test('length of post should grow', () => {
  // 1. test data
  let action = addPost("test action");


  // 2. action
  let newState = profileReducer(initialState, action);

  // 3. expectation
  expect(newState.PostsData.length).toBe(3);

});

test('message of new post should be correct', () => {
  // 1. test data
  let action = addPost("test action");


  // 2. action
  let newState = profileReducer(initialState, action);

  // 3. expectation
  expect(newState.PostsData[newState.PostsData.length - 1].text).toBe("test action");

});

test('length of posts after deleting should decrements', () => {
  // 1. test data
  let action = deletePost(1);

  // 2. action
  let newState = profileReducer(initialState, action);

  // 3. expectation
  expect(newState.PostsData.length).toBe(1);

});
