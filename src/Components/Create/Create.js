import React, { useState, useContext, createRef } from "react";
import Compressor from "compressorjs";
import { useHistory,Redirect } from "react-router";
import axios from "axios";
import styled from "styled-components";
import TextInputs from "./TextInputs";
import Preview from "./Preview";
const Create = ({UserContext}) => {
  const [{isLoggedIn}]=useContext(UserContext);
  const push = useHistory().push;
  const [occasion, setOccasion] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState({ month: "", day: "", year: "" });
  const [details, setDetails] = useState("");

  const [photos, setPhotos] = useState([]);
  const [preview, setPreview] = useState([]);

  const mm = createRef(),
    dd = createRef(),
    yyyy = createRef();

  const handle = {
    city: (e) => {
      setCity(e);
    },
    occasion: (e) => {
      setOccasion(e);
    },
    date: (e, i) => {
      let reg = /^[\d]*$/;
      if (reg.test(e)) {
        if (i === 1 && e.length <= 2) {
          setDate({ ...date, month: e });
          if (e.length >= 2) dd.current.focus();
        } else if (i === 2 && e.length <= 2) {
          setDate({ ...date, day: e });
          if (e.length >= 2) yyyy.current.focus();
        } else if (i === 3 && e.length <= 4) {
          setDate({ ...date, year: e });
          if (e.length >= 4) mm.current.focus();
        }
      }
    },
    details: (e) => {
      setDetails(e);
    },
    createPost: async () => {
      let fileData = new FormData();
      for (let i = 0; i < photos.length; i++) {
        fileData.append(i, photos[i]);
      }

      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      try {
        let newPost = await axios.post(
          `/api/posts?occasion=${occasion}&city=${city}&date=${`${date.month}-${date.day}-${date.year}`}&details=${details}`,
          fileData,
          config
        );
        if (newPost.status === 200) {
          push(`/posts/${newPost.data.post_id}`);
        }
      } catch (err) {
        console.log(err);
      }
    },
    files: (files) => {
      let pic = Object.values(files);
      let values = [...preview, ...pic];

      setPreview(values);
      let arr = [...photos];
      for (let i = 0; i < values.length; i++) {
        new Compressor(values[i], {
          quality: 80,
          success(result) {
            arr.push(result);
          },
        });
      }
      return setPhotos(arr);
    },
  };

  return (
    <CreateBox>
      <TextInputs
        handle={handle}
        occassion={occasion}
        dd={dd}
        mm={mm}
        yyyy={yyyy}
        city={city}
        date={date}
        details={details}
      />
      <Preview preview={preview} handle={handle} />

      <Label as="div" onClick={() => handle.createPost()}>
        Submit
      </Label>
    </CreateBox>
  );
};
export default Create;

const CreateBox = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

let Label = styled.label`
  display: flex;
  width: calc(60%);
  min-height: 3rem;
  padding: 1rem;
  cursor: pointer;
  background-color: ${(props) => props.theme.yellow};
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 10px;
  font-size: 20px;
  color: ${(props) => props.theme.purple};
  z-index: 2;
  border: 3px solid;
  &: hover {
    border: 3px solid ${(props) => props.theme.purple};
    background-color: ${(props) => props.theme.purple};
    color: ${(props) => props.theme.yellow};
  }
`;
