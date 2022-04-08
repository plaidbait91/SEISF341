import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Container, VStack,  StackDivider} from "@chakra-ui/react";
import Questionwrapper from '../components/Questionwrapper'


export default function Home({ questions, email, deleter }) {
    
    return(
        <div>
            <Container maxW='container.lg' border='solid black' padding='12px' borderRadius={8}>
                <VStack 
                    spacing={4}
                    align='stretch'>
               {
                   (questions.length > 0) ?
                   questions.map(question => 
                    <Questionwrapper key={question._id} question = {question} email = {email} deleter = {deleter} />
                   )

                   :
                   
                   <p>Your query did not return any results!</p>
               }
               </VStack>
            </Container>
        </div>
    )
}