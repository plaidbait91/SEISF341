import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Container, VStack,  StackDivider} from "@chakra-ui/react";
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
            <Container maxW='container.lg' border='solid black' padding='12px' borderRadius={8}>
                <VStack 
                    spacing={4}
                    align='stretch'>
               {
                   questions.map(question =>(
                    <Questionwrapper key={question._id} question={question}  ></Questionwrapper>
                   ))
               }
               </VStack>
            </Container>
        </div>
    )
}