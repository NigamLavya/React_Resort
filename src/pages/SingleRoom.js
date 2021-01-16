import React, { Component } from 'react'
import { RoomContext } from '../Context'
import { Link } from 'react-router-dom'
import StyledHero from '../components/StyledHero'
import Banner from '../components/Banner'

export default class SingleRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slug: this.props.match.params.id
        }
    }
    static contextType = RoomContext;

    render() {
        let { getRoom } = this.context;
        let room = getRoom(this.state.slug);

        if (!room) {
            return (
                <div className="error">
                    <h3>No Such Rooms found</h3>
                    <Link className='btn-primary' to='/'>Back to Home</Link>
                </div>
            )
        }
        let [mainImage, ...restImages] = room.images

        return (
            <>
                <StyledHero heroURL={mainImage}>
                    <Banner title={`${room.name} rooms`}>
                        <Link className='btn-primary' to='/rooms'>Back to Rooms</Link>
                    </Banner>
                </StyledHero>
                <section className='single-room'>
                    <div className="single-room-images">
                        {restImages.map((image, index) => {
                            return <img key={index} src={image} alt={room.name} />
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>details</h3>
                            <p>{room.description}</p>
                        </article>
                        <article className="info"><h3>info</h3><h6>price : ${room.price}</h6><h6>size : {room.size} SQFT</h6><h6>max capacity :{room.capacity > 1 ? `${room.capacity} people` : `single person`} </h6><h6>{room.pets?'pets allowed':'No pets allowed'}</h6><h6>{room.breakfast && 'free breakfast included'}</h6></article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6>extras</h6>
                    <ul className='extras'>
                        {room.extras.map((extra,index)=>{
                            return <li key={index}>- {extra}</li>
                        })}
                        
                    </ul>
                </section>
            </>
        )
    }
}
