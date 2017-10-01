import React from 'react'
import axios from 'axios'
import {Header, Modal, Button, Image} from 'semantic-ui-react'


const Brewery = ({brewery}) => (
<Modal trigger={<Button primary>Show More</Button>}>
    <Modal.Header>{brewery.name}</Modal.Header>
    <Modal.Content image>
      {brewery.images ? 
        <Image size='large' src={brewery.images.square_large} />  :
        <Image size='large'src="http://images.all-free-download.com/images/graphiclarge/beer_mug_clip_art_13660.jpg" />
      }
      <div style={{marginLeft: "30px"}}>
        {brewery.description &&
          <div style={styles.modalDivs}>
            <Header>About</Header>
            {brewery.description}
          </div>
        }
        {brewery.established &&
          <div style={styles.modalDivs}>
            <Header>Established</Header>
            {brewery.established}
          </div>
        }
          <div style={styles.modalDivs}>
            <Header>Organic</Header>
            {brewery.organic === "Y" ? "Yes" : "No"}
          </div>
          <div style={styles.modalDivs}>
            <Header>Classification</Header>
            {brewery.brand_classification}
          </div>
          {brewery.website &&
          <div style={styles.modalDivs}>
            <Header>Website</Header>
            <a style={{marginTop: "1px"}}href={brewery.website}>{brewery.website}</a>
          </div>
        }
      </div>
    </Modal.Content>
  </Modal>
)

const styles = {
  modalDivs: {marginBottom: "10px"},
}
  




export default Brewery