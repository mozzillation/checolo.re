import {Component} from 'react'
import Head from 'next/head'

import getCurrentRegion from './api/getCurrentRegion'

export default class Index extends Component{

  constructor(props){
    super(props)

    this.state = {
      latitude: null,
      longitude: null,
      isLoading: false,
      isError: false,
    }

    this.onError = this.onError.bind(this)
  }

  onError(error){
    console.log(error)
    this.setState({
      isLoading: false,
      isError: true
    })
  }


  componentDidMount() {
    if ("geolocation" in navigator) {
      this.setState({isLoading: true})
      navigator.geolocation.getCurrentPosition((position) => {
         const point = [position.coords.longitude, position.coords.latitude]
         const {features} = this.props.regions

         const region = getCurrentRegion(point, features)

         console.log(region)

         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           region: region,
           isLoading: false
         })
       }, (error) => this.onError(error));

     } else {
        this.onError({code: 0})
     }
  }

  render(){

    if (this.state.isLoading) return (<>loading..</>)
    if (this.state.isError) return (<>errore</>)
    return (
      <div>
        {this.state.region?.map((region) => <div key={region}>{region.name}</div>)}
      </div>
    )
  }
}


export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson')
  const regions = await res.json()

  return {
    props: {
      regions
    },
  }
}
