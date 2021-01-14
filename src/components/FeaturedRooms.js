import React, { Component } from 'react'
import { RoomContext } from '../Context'
import Title from './Title'
import Room from './Room'
import Loader from './Loader'

export default class FeaturedRooms extends Component {
    static contextType = RoomContext;
    render() {
        let { featuredRooms, loading } = this.context;
        return (
            <section className="featured-rooms">
                <Title title="Featured Rooms"></Title>
                <div className="featured-rooms-center">
                    {loading ? <Loader /> : featuredRooms.map((room) => <Room key={room.id} room={room} />)}
                </div>
            </section>
        )
    }
}
