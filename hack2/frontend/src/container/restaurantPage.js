/****************************************************************************
  FileName      [ restaurantPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ Implement the restaurant page ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/restaurantPage.css'
import Information from './information';
import Comment from './comment';
import { useParams } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const RestaurantPage = () => {
    const { id } = useParams()
    const [info, setInfo] = useState({})
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const getInfo = async () => {
        // TODO Part III-2: get a restaurant's info
        const { data } = await instance.get('/getInfo', {params:{
            id: id
        }});
        console.log(data)
        let { message, contents } = data
        if (message == 'success') {
            setInfo(contents[0])
        }
    }
    const getComments = async () => {
        // TODO Part III-3: get a restaurant's comments 
        const { data } = await instance.get('/getCommentsByRestaurantId', {params:{
            restaurantId: id
        }});
        let { message, contents } = data
        if (message == 'success') {
            setComments(contents)
        }
    }
    useEffect(() => {
        if (Object.keys(info).length === 0) {
            getInfo()
            // getComments()
        }
    }, [])

    useEffect(() => {
        getComments()
    }, [getInfo])
    
    useEffect(() => {
        // TODO Part III-3-c: update the comment display immediately after submission
    }, [comments])

    /* TODO Part III-2-b: calculate the average rating of the restaurant */
    const [rating, setRating] = useState(0);

    const avg = (lst) => {
        if (lst == [] || !lst) return 0
        // console.log(lst)
        let sumNum = 0
        for (let i= 0; i<lst.length; i++){
            sumNum += lst[i].rating
        }
        return sumNum/lst.length
    }

    useEffect(() => {
        console.log()
        if(comments) {
            // console.log(avg(comments.rating))
            setRating(avg(comments))
        }
    }, [comments])
    
    return (
        <div className='restaurantPageContainer'>
            {Object.keys(info).length === 0 ? <></> : <Information info={info} rating={rating} />}
            <Comment restaurantId={id} comments={comments} setComments={setComments} setLoad={setLoading} />
        </div>
    )
}
export default RestaurantPage