import axios from "axios";
import React, { useState, createRef } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
const Create = (props) => {
  const push = useHistory().push
  const [occasion, setOccasion] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState({ month: "", day: "", year: "" });
  const [details, setDetails] = useState("");
  const [people, setPeople] = useState("");
  const [location, setLocation] = useState("");
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
      setDate(e);
      if (i === 1 && e.month.length >= 2) {
        dd.current.focus();
      } else if (i === 2 && e.day.length >= 2) {
        yyyy.current.focus();
      } else if (i === 3 && e.year.length >= 4) {
        mm.current.focus();
      }
    },
    details: (e) => {
      setDetails(e);
    },
    people: (e) => {
      setPeople(e);
    },
    location: (e) => {
      setLocation(e);
    },
    createPost: async () => {
        let fileData= new FormData();
      for(let i = 0; i<photos.length;i++){
        fileData.append(i,photos[i]);
      }

        let config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
      
        try{
            let newPost = await axios.post(
              `/api/posts?occasion=${occasion}&city=${city}&date=${`${date.month}-${date.day}-${date.year}`}&details=${details}&people=${people}&location=${location}`,fileData,config
            );
                if(newPost.status===200){
                    push(`/posts/${newPost.data.post_id}`)
                }
        }catch(err){
            console.log(err)
        }

    },
    files: (files) => {
      let photoArr = Object.values(files);
      setPreview(photoArr)
      setPhotos(files);
    },
  };
  let map = preview.map((p, i) => {
    return <Img src={URL.createObjectURL(p)} key={i} alt="" />;
  });
  

  return (
    <CreateBox>
      <Input
        onChange={(e) => handle.occasion(e.target.value)}
        type="text"
        value={occasion}
        placeholder="occasion"
      ></Input>
      <Input
        onChange={(e) => handle.city(e.target.value)}
        type="text"
        value={city}
        placeholder="city"
      ></Input>
      <Date>
        Date
        <DateInput
          onChange={(e) => handle.date({ ...date, month: e.target.value }, 1)}
          type="text"
          value={date.month}
          placeholder="mm"
        />
        <DateInput
          ref={dd}
          onChange={(e) => handle.date({ ...date, day: e.target.value }, 2)}
          type="text"
          value={date.day}
          placeholder="dd"
        />
        <YearInput
          ref={yyyy}
          onChange={(e) => handle.date({ ...date, year: e.target.value }, 3)}
          type="text"
          value={date.year}
          placeholder="yyyy"
        />
      </Date>
      <Input
        ref={mm}
        onChange={(e) => handle.details(e.target.value)}
        type="text"
        value={details}
        placeholder="details"
      />

      <div
        onClick={() => handle.createPost()}
        style={{ padding: "5px", color: "blue" }}
      >
        click me
      </div>
  
      <UploadContainer>
        <HiddenInput
          type="file"
          id='multi'
          multiple='multiple'
          onChange={(e) => handle.files(e.target.files)}
        />
        <Label htmlFor="multi">click</Label>
      </UploadContainer>

      {map}
    </CreateBox>
  );
};
export default Create;
const CreateBox = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const Input = styled.input`
  width: 20rem;
  padding: 1rem;
  margin: 0.5rem;
`;
const DateInput = styled(Input)`
  width: 2rem;
  text-align: center;
`;
const YearInput = styled(DateInput)`
  width: 4rem;
`;
const Date = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
let HiddenInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
z-index:-1;
`;

let Label = styled.label`
  font-weight: 400;
  display: flex;
  flex-direction: column;
  background-color:red;
  align-items: center;
  font-size: 10px;
  color: black;
  z-index:1;
`;
let UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Img = styled.img`
  height: 4rem;
`;
