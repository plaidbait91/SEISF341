import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Container } from "@chakra-ui/react";
import Questionwrapper from "../components/Questionwrapper";

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
            <Container border='solid black' padding='20px'>
               {
                   questions.map(question =>(
                    //    <li key={question._id}>{question.title} </li>
                    <Questionwrapper title={question.title} body={question.body}/>
                   ))
               }
            </Container>
        </div>
    )
}