import { useState } from "react";
import { Grid, GridItem, Image, Heading } from "@chakra-ui/react";

export default function Profile(){
    return(
        <Grid templateColumns='repeat(7, 1fr)'>
            <GridItem margin="20px" colStart={1}>
                <Image src={localStorage.getItem('pplink')}></Image>
            </GridItem>
            <GridItem align="left" colSpan={2}>
                <Heading size="md">Name: {localStorage.getItem('name')}</Heading>
                <Heading size="md">Email: {localStorage.getItem('email')}</Heading>
                <Heading size="md">Total Upvotes: </Heading>
            </GridItem>
        </Grid>
    )
}