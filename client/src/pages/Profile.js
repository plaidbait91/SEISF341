import axios from "axios";
import { Grid, GridItem, Image, Heading, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Home from "./Home";
import Questionwrapper from "../components/Questionwrapper";

export default function Profile(){
    
    const [profile, setProfile] = useState('')
    const [questions, setQuestions] = useState([])

    const delQ = (id) => {
        axios.delete(`http://localhost:5000/q/${id}`, { headers : {
          'x-access-token': localStorage.getItem('jwtToken') 
          } })
          .then(res => {
            console.log(res);
          })
      }

    const getProfile = () => {
        axios.get(`/u/${localStorage.getItem('email')}`)
                .then(res => {
                    setProfile(res.data[0]);

                    res.data[0].questions.map(qid => {
                        axios.get(`http://localhost:5000/q/${qid}`)
                        .then(res=>{
                            setQuestions(questions => [...questions, res.data])
                        })
                        .catch(err=>{
                            console.error(err);
                        })
                    })
                })
            // console.log(questions)
        }
    
    useEffect(() => {
        getProfile()
        }, [])

    return(
        <Grid templateColumns='repeat(7, 1fr)'>
            <GridItem margin="20px" colStart={1}>
                <Image src={localStorage.getItem('pplink')}></Image>
            </GridItem>
            <GridItem align="left" colSpan={2}>
                <Heading size="md">Name: {profile.fullName}</Heading>
                <Heading size="md">Email: {profile.email}</Heading>
                <Heading size="md">Total Upvotes: {profile.upvotes}</Heading>
            </GridItem>
            <GridItem colSpan={10}>
                <Heading align="stretch">Questions Posted</Heading>
                <br/>
                {/* {questions.map(question => 
                    <Questionwrapper key={question._id} question = {question} email = {localStorage.getItem('email')} deleter = {delQ} />
                )} */}
                <Home questions = {questions} email = { localStorage.getItem('email') } deleter = { delQ }/>
            </GridItem>
        </Grid>
    )
}