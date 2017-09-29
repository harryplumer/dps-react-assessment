import React from 'react'
import axios from 'axios'
import {Header, Container, Grid, Item, Loader, Input} from 'semantic-ui-react'
import BreweryItem from './BreweryItem'
import InfiniteScroll from 'react-infinite-scroller';


class Beers extends React.Component{
  state = {breweries: [], page: 1, totalPages: 0, searchTerm: ""}
  
  componentDidMount(){
   this.fetchAllBreweries()
  }

  fetchAllBreweries = () => {
    axios.get('/api/all_breweries?page=1&per_page=10')
    .then(res => {
      this.setState({breweries: res.data.entries, totalPages: res.data.total_pages, searchTerm: ""})
    })
  }

  loadMore = () => {
    const page = this.state.page + 1;
    const {searchTerm} = this.state
    let url = ""
    if (searchTerm === "")
      url = `/api/all_breweries?page=${page}&per_page=10`
    else 
      url = `/api/search_breweries?query=${searchTerm}&page=${page}&per_page=10`

    axios.get(url)
      .then( ({ data }) => {
        this.setState( state => {
          return { breweries: [...state.breweries, ...data.entries], page: state.page + 1 }
        })
      })
    }

  liveSearch = (e) => {
    const searchTerm = e.target.value
    if (searchTerm === "")
      this.fetchAllBreweries()
    else {
      axios.get(`/api/search_breweries?query=${searchTerm}&page=1&per_page=10`)
      .then(res => {
        this.setState({breweries: res.data.entries, totalPages: res.data.total_pages, searchTerm, page: 1})
      })
    }
  }
  

  render(){
    const {breweries, page, totalPages} = this.state
    return(
      <Container>
        <Header as="h1" textAlign="center" style={{marginTop: "30px"}}>Breweries</Header>
        <Grid>
          <Grid.Row>
            <Input 
              placeholder="Search..." 
              onChange={this.liveSearch} 
              style={{margin: "0 auto", marginTop: "10px"}} 
            />
          </Grid.Row>
          <InfiniteScroll
              pageStart={page}
              loadMore={this.loadMore}
              hasMore={page < totalPages}
              loader={<Loader />}
              useWindow={true}
            >
            <Item.Group divided>
              {breweries.map(brewery => <BreweryItem key={brewery.id} brewery={brewery}/>)}
            </Item.Group>
          </InfiniteScroll>
        </Grid>
      </Container>
    )
  }
}

export default Beers