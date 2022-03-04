import { useEffect, useState } from "react";
import axios from 'axios';
import {Container,
    Button} 
    from '@chakra-ui/react'

export default function Home() {
    const [questions,setQuestions] = useState([]);
    useEffect(()=>{
        axios.get('/all-questions')
        .then(res=>{
            console.log(res);
            setQuestions(res.data);
        })
        .catch(err=>{
            console.error(err);
        })
    },[])
    return(
        <div>
            <Container>
            <Button colorScheme='red'>Button</Button>
               {
                   questions.map(question =>(
                       <li key={question._id}>{question.title} </li>
                   ))
               }
            </Container>
        </div>
    )
}