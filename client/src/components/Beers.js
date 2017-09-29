import React from 'react'
import axios from 'axios'
import {Header, Container, Grid, Item, Loader} from 'semantic-ui-react'
import BeerItem from './BeerItem'
import InfiniteScroll from 'react-infinite-scroller';


class Beers extends React.Component{
  state = {beers: [], page: 1, totalPages: 0}
  
  componentDidMount(){
    axios.get('/api/all_beers?page=1&per_page=10')
      .then(res => {
        this.setState({beers: res.data.entries, totalPages: res.data.total_pages})
      })
  }

  loadMore = () => {
    const page = this.state.page + 1;
    axios.get(`/api/all_beers?page=${page}&per_page=10`)
      .then( ({ data, headers }) => {
        this.setState( state => {
          return { beers: [...state.beers, ...data.entries], page: state.page + 1 }
        })
      })
  }
  

  render(){
    const {beers, page, totalPages} = this.state
    return(
      <Container>
        <Header as="h1" textAlign="center" style={{marginTop: "30px"}}>Beers</Header>
        <Grid>
        <InfiniteScroll
            pageStart={page}
            loadMore={this.loadMore}
            hasMore={page < totalPages}
            loader={<Loader />}
            useWindow={true}
          >
          <Item.Group divided>
            {beers.map(beer => <BeerItem beer={beer}/>)}
          </Item.Group>
          </InfiniteScroll>
        </Grid>
      </Container>
    )
  }





}



export default Beers