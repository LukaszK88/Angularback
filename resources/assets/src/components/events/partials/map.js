import React,{Component} from 'react';

export default class GoogleMaps extends Component{

    componentDidMount(){
        const uluru = {lat: this.props.lat, lng:this.props.lng};
        console.log(uluru);
        var map = new google.maps.Map(this.refs.map, {
            zoom:15,
            center:uluru
        })

        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }

    render(){
        return <div style={{height:'250px',width:'100%'}} ref="map"></div>
    }

}