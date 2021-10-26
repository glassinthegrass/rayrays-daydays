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
{post[0]?.city}
{post[0]?.occasion}
{post[0]?.details}
{post[0]?.date}
{post.map((p,i)=>{
return <Image key={i} publicId={p.public_id}>
    <Transformation crop='scale' height='300' quality='70'/>
</Image>
})}
</ViewBox>
}

export default PostView
const ViewBox = styled.section`
width:100vw;
height:calc(100vh - 3rem);
`