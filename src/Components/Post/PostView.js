import axios from 'axios';
import { Image, Transformation } from 'cloudinary-react';
import React, { useCallback, useEffect,useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
const PostView =(props)=>{
    const [post,setPost]=useState([])
    const post_id = useParams().post_id;
    console.log(props)
const getPost = useCallback(async()=>{
    try{
    let post = await axios.get(`/api/posts/${post_id}`);
        setPost(post.data)
    }catch(err){
        console.log(err)
    }
},[post_id])



useEffect(()=>{
getPost()
},[getPost])
return <ViewBox>
<InfoSpace>
<Info></Info>
<Info></Info>
<Info></Info>
<Info></Info>
<Info></Info>
<Info>Title</Info>
    <Info>
{post[0]?.city}
    </Info>
    <Info>
{post[0]?.occasion}
    </Info>
    <Info>
{post[0]?.details}
    </Info>
    <Info>
{post[0]?.date}
    </Info>
</InfoSpace>
{post.map((p,i)=>{
return <Image key={i} publicId={p.public_id}>
    <Transformation crop='scale' height='300' quality='70'/>
</Image>
})}
</ViewBox>
}

export default PostView
const ViewBox = styled.section`
height: calc(100vh - 3rem);
overflow-y: auto;
width: 100vw;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
z-index: 1;
`
const Info = styled.h4`
padding:0.5rem;
text-align:center;
`
const InfoSpace=styled.span`
display:flex;
flex-direction:column;
justify-content:space-around;
align-items:flex-start;
`