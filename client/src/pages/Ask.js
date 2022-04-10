import { Grid, GridItem, Heading, Textarea, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from 'axios';

const Ask = () => {
    
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState('')

    const updateQuery = ({target}) => {
        setTag(target.value)
    }

    const keyPressed = ({key}) => {
        if(key === "Enter")
        {
            setTags(tags => [...tags, tag])
            setTag('')
        }
    }

    const askq = (e) => {
        const question = { title, body, tags }
        axios.post('/ask', question, { headers : {
            'x-access-token': localStorage.getItem('jwtToken') 
        } }).then((err) => {
            console.log('new question added')
            console.log("Status:",err);
        })
        console.log(tags)
        setTitle('')
        setBody('')
        setTags([])
        setTag('')
    }

    return ( 
        <Grid
            bgColor={"white"}
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(1, 1fr)'
            gap={10}
            margin='20px'
            padding={8}
            shadow='md' borderWidth='2px' flex='1' borderRadius='lg'
            >
                <GridItem>
                    <Heading as='h1' size='lg'>Ask a Question</Heading>
                </GridItem>
                <GridItem shadow='md' flex='1' borderRadius='lg' align="left" padding={1} borderWidth='2px'>
                    <Grid templateColumns='repeat(10, 1fr)'>
                        <GridItem colSpan={1}>
                            <Heading as='h1' size='lg'>Title</Heading>
                        </GridItem>
                        <GridItem colStart={2} colEnd={12}>
                            <Input
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></Input>
                        </GridItem>
                    </Grid>
                </GridItem>
                <GridItem shadow='md' flex='1' borderRadius='lg' align="left" padding={1} borderWidth='2px'>
                    <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(1, 1fr)'>
                        <GridItem colSpan={1}>
                            <Heading as='h1' size='lg'>Body</Heading>
                        </GridItem>
                        <br/>
                        <GridItem>
                            <Grid margin="5px">
                                <Textarea
                                    required
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                ></Textarea>
                            </Grid>
                        </GridItem>
                    </Grid>
                </GridItem>
                <GridItem shadow='md' flex='1' borderRadius='lg' align="left" padding={1} borderWidth='2px'>
                    <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(1, 1fr)'>
                        <GridItem colSpan={1}>
                            <Heading>Tags</Heading>
                        </GridItem>
                        <br/>
                        <GridItem>
                            <Grid margin="5px">
                                <Input
                                    required
                                    value={tag}
                                    onChange={updateQuery}
                                    onKeyPress={keyPressed}
                                ></Input>
                            </Grid>
                            <GridItem display="flex">
                            {tags.map(tag => <GridItem margin="3px" display="flex" borderRadius="5px" borderWidth="2px" w={(tag.length*2).toString()+"%"}>{tag}</GridItem>)}
                            </GridItem>
                        </GridItem>
                    </Grid>
                </GridItem>
            <Button type="submit" align="left" colorScheme='blue' w='75px' onClick={askq}>Submit</Button>
        </Grid>
     );
}
 
export default Ask;