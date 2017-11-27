import React,{Component} from 'react';
/* global google */
export default class GoogleMaps extends Component{

    componentDidMount(){
        const googleMap = new google.maps;
        const uluru = {lat: this.props.lat, lng:this.props.lng};
        console.log(uluru);
        var map = googleMap.Map(this.refs.map, {
            zoom:15,
            center:uluru
        })

        var marker = googleMap.Marker({
            position: uluru,
            map: map
        });
    }

    render(){
        return <div style={{height:'250px',width:'100%'}} ref="map"></div>
    }

}