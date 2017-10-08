import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Tooltip } from 'reactstrap';
import {Image } from 'semantic-ui-react';
import { userHelper } from '../../../../helpers/user';
import { uploadProfileImage } from '../../../../actions';
import { connect } from 'react-redux';

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

        this.props.uploadProfileImage(this.props.currentUser.user.id,acceptedFiles);
        this.setState({
            imgPreview: acceptedFiles[0].preview
        });

    }

  render() {
      const {profile,currentUser} = this.props;

    return (
        <div>

            {(currentUser.user && currentUser.user.id == profile.user.id) &&

           <Dropzone id="upload" name="file" style={{width: 'max-width'}} onDrop={this.onDrop.bind(this)}>
                      <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="upload"
                               toggle={this.toggle.bind(this)}>
                          Click or drop image to upload
                      </Tooltip>

                      { this.state.imgPreview  &&
                      <Image src={this.state.imgPreview}/>}
               { !this.state.imgPreview  &&
               <Image src={userHelper.getImage(profile.user)}/> }
           </Dropzone>
            }

            {(!currentUser.isLoggedIn) &&

              <div>
                  <Image src={userHelper.getImage(profile.user)}/>
              </div>
            }

        </div>
    )
  }
}

export default connect(null,{uploadProfileImage})(DropZone);