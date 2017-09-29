import React from 'react'
import axios from 'axios'
import {Header, Container, Grid, Item, Loader, Input} from 'semantic-ui-react'
import BeerItem from './BeerItem'
import InfiniteScroll from 'react-infinite-scroller';


class Beers extends React.Component{
  state = {beers: [], page: 1, totalPages: 0, searchTerm: ""}
  
  componentDidMount(){
   this.fetchAllBeers()
  }

  fetchAllBeers = () => {
    axios.get('/api/all_beers?page=1&per_page=10')
    .then(res => {
      this.setState({beers: res.data.entries, totalPages: res.data.total_pages, searchTerm: ""})
    })
  }

  loadMore = () => {
    const page = this.state.page + 1;
    const {searchTerm} = this.state
    let url = ""
    if (searchTerm === "")
      url = `/api/all_beers?page=${page}&per_page=10`
    else 
      url = `/api/search_beers?query=${searchTerm}&page=${page}&per_page=10`

    axios.get(url)
      .then( ({ data }) => {
        this.setState( state => {
          return { beers: [...state.beers, ...data.entries], page: state.page + 1 }
        })
      })
    }

  liveSearch = (e) => {
    const searchTerm = e.target.value
    if (searchTerm === "")
      this.fetchAllBeers()
    else {
      axios.get(`/api/search_beers?query=${searchTerm}&page=1&per_page=10`)
      .then(res => {
        this.setState({beers: res.data.entries, totalPages: res.data.total_pages, searchTerm, page: 1})
      })
    }
  }
  

  render(){
    const {beers, page, totalPages} = this.state
    return(
      <Container>
        <Header as="h1" textAlign="center" style={{marginTop: "30px"}}>Beers</Header>
        <Grid>
          <Input 
            placeholder="Search..." 
            onChange={this.liveSearch} 
            style={{margin: "0 auto", marginTop: "10px"}} 
          />
          <InfiniteScroll
              pageStart={page}
              loadMore={this.loadMore}
              hasMore={page < totalPages}
              loader={<Loader />}
              useWindow={true}
            >
            <Item.Group divided>
              {beers.map(beer => <BeerItem key={beer.id} beer={beer}/>)}
            </Item.Group>
          </InfiniteScroll>
        </Grid>
      </Container>
    )
  }
}

export default Beers