import React from 'react'
import axios from 'axios'
import {Header, Container, Grid, Item} from 'semantic-ui-react'
import BeerItem from './BeerItem'

class Beers extends React.Component{
  state = {beers: [], page: 1, totalPages: 0}
  
  componentDidMount(){
    axios.get("/api/all_beers")
      .then(res => {
        this.setState({beers: res.data.entries, totalPages: res.data.total_pages})
      })
  }

  render(){
    const {beers} = this.state
    return(
      <Container>
        <Header as="h1" textAlign="center">Beers</Header>
        <Grid>
          <Item.Group divided>
            {beers.map(beer => <BeerItem beer={beer}/>)}
          </Item.Group>
        </Grid>
      </Container>
    )
  }





}



export default Beers