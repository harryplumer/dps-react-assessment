import React from 'react'
import {Item, Button, Label, Icon} from 'semantic-ui-react'



const BeerItem = ({beer}) => (
  <Item style={{height: "190px", overflowY: "scroll"}}>
    {beer.labels ? <Item.Image src={beer.labels.medium} /> :
    <Item.Image src="http://images.all-free-download.com/images/graphiclarge/beer_mug_clip_art_13660.jpg" />
    }
    <Item.Content>
      <Item.Header>{beer.name_display}</Item.Header>
      <Item.Meta>
        {`ABV: ${beer.abv}%`}
        {beer.ibu && ` | IBU: ${beer.ibu}`}
      </Item.Meta>
      <Item.Description>{beer.description}</Item.Description>
      <Item.Extra>
        <Button primary floated='right'>
          Show Beer
          <Icon name='right chevron' />
        </Button>
        {beer.is_organic === 'Y' && <Label>Organic</Label>}
        {beer.available_id && <Label>Seasonal</Label>}
        {beer.glass && <Label>{`${beer.glass.name} Glass`}</Label>}
      </Item.Extra>
    </Item.Content>
  </Item>
)

export default BeerItem