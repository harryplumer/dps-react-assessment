import React from 'react'
import axios from 'axios'
import {Header, Modal, Button, Image, Popup} from 'semantic-ui-react'


const Beer = ({beer}) => (
<Modal trigger={<Button primary>Show More</Button>}>
    <Modal.Header>{beer.name}</Modal.Header>
    <Modal.Content image>
      {beer.labels ? 
        <Image size='large' src={beer.labels.large} />  :
        <Image size='large' src="http://images.all-free-download.com/images/graphiclarge/beer_mug_clip_art_13660.jpg" />
      }
      <div style={{marginLeft: "30px"}}>
        {beer.description &&
          <div style={styles.modalDivs}>
            <Header>About</Header>
            {beer.description}
          </div>
        }
        {beer.abv &&
          <div style={styles.modalDivs}>
            <Header>ABV</Header>
            {beer.abv}%
          </div>
        }
        {beer.ibu &&
          <div style={styles.modalDivs}>
            <Header>IBU</Header>
            {beer.ibu}
          </div>
        }
        {beer.style &&
          <Popup trigger={
            <div style={styles.modalDivs}>
              <Header>Style</Header>
              {beer.style.name}
            </div>}>
            <Popup.Content>
              {beer.style.description}
            </Popup.Content>
          </Popup>
        }
          <div style={styles.modalDivs}>
            <Header>Organic</Header>
            {beer.organic === "Y" ? "Yes" : "No"}
          </div>
          <div style={styles.modalDivs}>
            <Header>Availability</Header>
            {beer.available_id ? `${beer.available.name}` : "Not Listed"}
          </div>  
          <div style={styles.modalDivs}>
            <Header>Special Glass</Header>
            {beer.glassware_id ? `${beer.glass.name}` : "No"}
          </div>  
      </div>
    </Modal.Content>
  </Modal>
)

const styles = {
  modalDivs: {marginBottom: "10px"},
}
  

export default Beer