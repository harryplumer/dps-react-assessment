import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {Item, Button, Label, Icon} from 'semantic-ui-react'
import Brewery from './Brewery'



const BreweryItem = ({brewery}, history) => (
  <Item style={{marginTop: "10px", height: "180px", overflowY: "scroll"}}>
    {brewery.images ? <Item.Image size="small" src={brewery.images.square_medium} /> :
    <Item.Image size="small" src="http://images.all-free-download.com/images/graphiclarge/beer_mug_clip_art_13660.jpg" />
    }
    <Item.Content>
      <Item.Header>{brewery.name}</Item.Header>
      <Item.Meta>
        <a href={brewery.website}>Website <Icon name="linkify" size="small" /></a>
        {brewery.established && ` | Est: ${brewery.established}`}
      </Item.Meta>
      <Item.Description>{brewery.description}</Item.Description>
      <Item.Extra>
        <span style={{float: 'right'}}><Brewery brewery={brewery} /></span>
        <Label>{brewery.brand_classification}</Label>
        {brewery.is_organic === 'Y' && <Label>Organic</Label>}
      </Item.Extra>
    </Item.Content>
  </Item>
)

export default BreweryItem