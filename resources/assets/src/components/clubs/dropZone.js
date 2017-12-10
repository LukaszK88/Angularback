import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Tooltip } from 'reactstrap';
import {Image } from 'semantic-ui-react';
import { uploadClubLogo } from '../../actions/clubs';
import { connect } from 'react-redux';
import {config} from '../../config';

class DropZone extends Component {
    constructor(props){
        super(props);

        this.state = {
            tooltipOpen: false,
            imgPreview : null
        }

    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    onDrop(acceptedFiles, rejectedFiles) {

        this.props.uploadClubLogo(this.props.clubId,acceptedFiles);
        this.setState({
            imgPreview: acceptedFiles[0].preview
        });

    }

  render() {
      const {currentUser, clubId, club} = this.props;

    return (
        <div>

            {(currentUser.clubAdmin && currentUser.clubAdmin == clubId) &&

           <Dropzone id="upload" name="file" style={{width: 'max-width'}} onDrop={this.onDrop.bind(this)}>
                      <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target="upload"
                               toggle={this.toggle.bind(this)}>
                          Click or drop image to upload
                      </Tooltip>

                      { this.state.imgPreview  &&
                      <Image src={this.state.imgPreview}/>}
               { !this.state.imgPreview  &&
               <Image src={club.logo}/> }
               { (!this.state.imgPreview && !club.logo)  &&
               <Image src={config.url.base + 'storage/profile_placeholder.png'}/> }
           </Dropzone>
            }

            {(!currentUser.isLoggedIn) &&

              <div>
                  <Image src={club.logo}/>
              </div>
            }

            {(currentUser.isLoggedIn && currentUser.clubAdmin != clubId) &&

            <div>
                <Image src={club.logo}/>
            </div>
            }

        </div>
    )
  }
}

export default connect(null,{uploadClubLogo})(DropZone);