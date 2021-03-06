import axios from "axios";
import { BASE_URL, LOCAL_BASE_URL, getAuthHeaders } from "../config";
import { arrayToGraph, forEachNode } from "../utils/rooms";

// INIT_PLAYER, INIT_PLAYER_SUCCESS, INIT_PLAYER_FAILURE
export const INIT_PLAYER = "INIT_PLAYER";
export const INIT_PLAYER_SUCCESS = "INIT_PLAYER_SUCCESS";
export const INIT_PLAYER_FAILURE = "INIT_PLAYER_FAILURE";

export const initializePlayer = () => dispatch => {
  dispatch({
    type: INIT_PLAYER
  });

  axios
    .get(`${BASE_URL}/adv/init/`, { headers: getAuthHeaders() })
    .then(res => {
      console.log("INIT ENDPOINT", res);
      dispatch({
        type: INIT_PLAYER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: INIT_PLAYER_FAILURE,
        error: err
      });
    });
};

// MOVE_PLAYER, MOVE_PLAYER_SUCCESS, MOVE_PLAYER_FAILURE
export const MOVE_PLAYER = "MOVE_PLAYER";
export const MOVE_PLAYER_SUCCESS = "MOVE_PLAYER_SUCCESS";
export const MOVE_PLAYER_FAILURE = "MOVE_PLAYER_FAILURE";

export const movePlayer = direction => dispatch => {
  if (!["n", "s", "e", "w"].includes(direction)) {
    throw new Error("That is not a valid move");
  }

  dispatch({
    type: MOVE_PLAYER
  });

  axios
    .post(`${BASE_URL}/adv/move/`, { direction }, { headers: getAuthHeaders() })
    .then(res => {
      console.log(res);
      dispatch({
        type: MOVE_PLAYER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: MOVE_PLAYER_FAILURE,
        error: err
      });
    });
};

// PLAYER_SAYS, PLAYER_SAYS_SUCCESS, PLAYER_SAYS_FAILURE
export const PLAYER_SAYS = "PLAYER_SAYS";
export const PLAYER_SAYS_SUCCESS = "PLAYER_SAYS_SUCCESS";
export const PLAYER_SAYS_FAILURE = "PLAYER_SAYS_FAILURE";

export const playerSays = message => dispatch => {
  dispatch({
    type: PLAYER_SAYS
  });

  axios
    .post(`${BASE_URL}/adv/say/`, { message }, { headers: getAuthHeaders() })
    .then(res => {
      dispatch({
        type: PLAYER_SAYS_SUCCESS,
        payload: res.status
      });
    })
    .catch(err => {
      dispatch({
        type: PLAYER_SAYS_FAILURE,
        error: err
      });
    });
};

// GET_ROOMS, GET_ROOMS_SUCCESS, GET_ROOMS_FAILURE
export const GET_ROOMS = "GET_ROOMS";
export const GET_ROOMS_SUCCESS = "GET_ROOMS_SUCCESS";
export const GET_ROOMS_FAILURE = "GET_ROOMS_FAILURE";

export const getRooms = () => dispatch => {
  dispatch({
    type: GET_ROOMS
  });

  axios
    .get(`${BASE_URL}/adv/rooms/`, { headers: getAuthHeaders() })
    .then(res => {
      const rooms = res.data;
      let graphArray = arrayToGraph(rooms);

      dispatch({
        type: GET_ROOMS_SUCCESS,
        payload: graphArray
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ROOMS_FAILURE,
        error: err
      });
    });
};
// .catch(err => {
//   console.log(err);
//   throw new Error(err);
//   dispatch({
//     type: GET_ROOMS_FAILURE,
//     error: err
//   });
// });
