import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Image, Transformation } from "cloudinary-react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PostView = ({ user }) => {
  const post_id = useParams().post_id;
  const [post, setPost] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState("");
  const [idx, setIdx] = useState(0);
  const [big, setBig] = useState(false);

  const handle = {
    getPost: useCallback(async () => {
      try {
        let post = await axios.get(`/api/posts/${post_id}?offset=0`);
        setPhotos(post.data.pictures);
        delete post.data.pictures;
        setPost(post.data);
      } catch (err) {
        console.log(err);
      }
    }, [post_id]),
    getIndex: (e) => {
      let selectedIndex = photos.findIndex((p) => +p.picture_id === +e);
      setIdx(+selectedIndex);
    },
    save: () => {
      setEdit(false);
      axios.post(
        `/api/posts/pictures?description=${details}&picture_id=${photos[idx].picture_id}`
      );
      let edit = photos.slice();
      edit[idx].description = details;
      setDetails("");
    },
  };
  const { getPost } = handle;
  useEffect(() => {
    getPost();
  }, [getPost]);

  const displayedPic = photos[idx] ? (
    <MainPicture onClick={() => setBig(true)} publicId={photos[idx].public_id}>
      <Transformation crop="fill" gravity="faces" height="450" width="450" />
    </MainPicture>
  ) : (
    <React.Fragment></React.Fragment>
  );

  const mapPics = photos.map((p, i) => {
    return (
      <Picture
        key={i}
        onClick={() => handle.getIndex(p.picture_id)}
        publicId={p.public_id}
      >
        <Transformation height="200" width="200" crop="fill" gravity="face" />
      </Picture>
    );
  });
  const mainDisplay = (
    <PostBox>
      <InfoSpace>
        <Row>
          <Info>{post?.occasion}</Info>
          <Info>{post?.city}</Info>
        </Row>
        <Row>
          <Info></Info>
          <Info>{post.date}</Info>
        </Row>
        <MainPic onClick={handle.bigToggle}>{displayedPic}</MainPic>
        <Row>
          <Info>{post.details}</Info>
        </Row>
        <Info>{photos[idx]?.description}</Info>
        {user.admin ? (
          edit ? (
            <Row>
              <Input
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                type="text"
              />{" "}
              <Save onClick={handle.save}>Save</Save>
            </Row>
          ) : (
            <Edit onClick={() => setEdit(true)}>edit post</Edit>
          )
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </InfoSpace>
      <Center>
        <PictureBox>{mapPics}</PictureBox>
      </Center>
    </PostBox>
  );
  const bigPic = big ? (
    <BigPic
      onClick={() => setBig(false)}
      publicId={photos[idx].public_id}
    ></BigPic>
  ) : (
    <React.Fragment></React.Fragment>
  );
  const displayToggle = big ? bigPic : mainDisplay;

  return <ViewBox>{displayToggle}</ViewBox>;
};

export default PostView;


const MainPic = styled.div``;
const Row = styled.span`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.pink};
`;

const ViewBox = styled.section`
  height: calc(100vh - 2rem);
  background-color: rgb(90, 29, 141, 0.9);
  overflow-y: auto;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const PostBox = styled(ViewBox)`
@media(min-width:425px){
  width: calc(50rem);
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
};
  display: flex;
  padding: 1rem;
  background-color: ${(props) => props.theme.purple};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100%);
  width: calc(100% - 2rem);
`;
const Center = styled.span`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  height: 20rem;
  @media (min-width: 425px) {
    height: calc(100% - 2rem);
    overflow: hidden;
  }
`;
const BigPic = styled(Image)`
  width: 100vw;
  position: absolute;
`;
const PictureBox = styled.section`
  background-color: rgb(90, 29, 141);
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  @media (min-width: 425px) {
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: flex-start;
    height: calc(100% - 2rem);
    width: 11rem;
    overflow-y: scroll;
    height: 100%;
    border: 3px solid rgb(90, 29, 141);
    gap: 1rem;
  } ;
`;

const Info = styled.h4`
  @media (min-width: 425px) {
    padding: 0.3rem;
  }
  text-align: left;
  background-color: ${(props) => props.theme.pink};
  color: ${(props) => props.theme.yellow};
`;
const InfoSpace = styled.span`
  @media (min-width: 425px) {
    width: 29rem;
    background-color: ${(props) => props.theme.pink};
    border: 3px solid rgb(90, 29, 141);
    margin-right: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0.3rem;
  } ;
`;

const Picture = styled(Image)`
  width: 100px;
  height: 100px;
  @media (min-width: 425px) {
    height: 135px;
    width: 135px;
  } ;
`;

const MainPicture = styled(Image)`
  @media (min-width: 425px) {
    width: 450px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  width: 100%;
`;

const Input = styled.input`
  width: calc(100% - 5rem);
  padding: 0.5rem;
  height: 1rem;
`;

const Save = styled.div`
  width: 3rem;
  padding: calc(0.5rem);
  height: 1rem;
  text-align: center;
  border: 2px solid ${(props) => props.theme.maroon};
`;
const Edit = styled(Save)`
  width: calc(100% - 2rem);
`;
