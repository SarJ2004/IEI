import axios from "axios";
import {
  addEventPhotoFail,
  addEventPhotoRequest,
  addEventPhotoSuccess,
  allEventFail,
  allEventRequest,
  allEventSuccess,
  clearError,
  clearMessage,
  deleteEventFail,
  deleteEventPhotoFail,
  deleteEventPhotoRequest,
  deleteEventPhotoSuccess,
  deleteEventRequest,
  deleteEventSuccess,
  getEventDetailsFail,
  getEventDetailsRequest,
  getEventDetailsSuccess,
  newEventFail,
  newEventRequest,
  newEventSuccess,
  updateEventFail,
  updateEventPosterFail,
  updateEventPosterRequest,
  updateEventPosterSuccess,
  updateEventRequest,
  updateEventSuccess,
} from "../reducers/eventReducer";
import { server } from "../store";

// Get All Events
export const getEvents =
  (keyword = "", currentPage = 1, status) =>
  async (dispatch) => {
    try {
      dispatch(allEventRequest());

      let link = `${server}/getEvent?keyword=${keyword}&page=${currentPage}`;

      if (status) {
        link = `${server}/getEvent?keyword=${keyword}&page=${currentPage}&status=${status}`;
      }

      const { data } = await axios.get(link);
      // await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(allEventSuccess(data));
    } catch (error) {
      dispatch(allEventFail(error.response.data.message));
    }
  };

// Create Event
export const createEvent = (eventData, token) => async (dispatch) => {
  try {
    dispatch(newEventRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/admin/addEvent?token=${token}`,
      eventData,
      config
    );
    // await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch(newEventSuccess(data));
  } catch (error) {
    dispatch(newEventFail(error.response.data.message));
  }
};

// Delete Event
export const deleteEvent = (id, token) => async (dispatch) => {
  try {
    dispatch(deleteEventRequest());

    const { data } = await axios.delete(
      `${server}/admin/deleteEvent/${id}?token=${token}`
    );
    // await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch(deleteEventSuccess(data));
  } catch (error) {
    dispatch(deleteEventFail(error.response.data.message));
  }
};

// Update Event Details
export const updateEvent = (eventData, id, token) => async (dispatch) => {
  try {
    dispatch(updateEventRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${server}/admin/updateEvent/${id}?token=${token}`,
      eventData,
      config
    );
    // await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch(updateEventSuccess(data));
  } catch (error) {
    dispatch(updateEventFail(error.response.data.message));
  }
};

//Update Event Poster
export const updateEventPoster = (eventData, id, token) => async (dispatch) => {
  try {
    dispatch(updateEventPosterRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `${server}/admin/event/updatePoster/${id}?token=${token}`,
      eventData,
      config
    );
    // await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch(updateEventPosterSuccess(data.success));
  } catch (error) {
    dispatch(updateEventPosterFail(error.response.data.message));
  }
};

//Add Event Photo
export const addEventPhoto = (eventPhoto, id, token) => async (dispatch) => {
  try {
    dispatch(addEventPhotoRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `${server}/admin/event/addPhoto/${id}?token=${token}`,
      eventPhoto,
      config
    );
    // await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch(addEventPhotoSuccess(data.success));
  } catch (error) {
    dispatch(addEventPhotoFail(error.response.data.message));
  }
};

// Get Event Details
export const getEventDetails = (id, token) => async (dispatch) => {
  try {
    dispatch(getEventDetailsRequest());

    const { data } = await axios.get(`${server}/getEvent/${id}?`);
    // await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch(getEventDetailsSuccess(data.event));
  } catch (error) {
    dispatch(getEventDetailsFail(error.response.data.message));
  }
};

// Delete Event Photo
export const deleteEventPhotos = (eventData, id, token) => async (dispatch) => {
  try {
    dispatch(deleteEventPhotoRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `${server}/admin/event/removePhoto/${id}?token=${token}`,
      eventData,
      config
    );
    // await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch(deleteEventPhotoSuccess(data.success));
  } catch (error) {
    dispatch(deleteEventPhotoFail(error.response.data.message));
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch(clearError());
};

//Clearing Message
export const clearMessages = () => async (dispatch) => {
  dispatch(clearMessage());
};

//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna
