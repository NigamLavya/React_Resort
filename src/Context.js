import React, { Component } from 'react'
import items from './data'

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        featuredRooms: [],
        sortedRooms: [],
        loading: true
    }
    componentDidMount() {
        // get Data
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter((room) => room.featured);
        this.setState({
            rooms, featuredRooms, sortedRooms: rooms, loading: false
        })
    }

    formatData(items) {
        return items.map((item) => {
            let id = item.sys.id;
            let images = item.fields.images.map((image) => image.fields.file.url)
            let room = { ...item.fields, images, id }
            return room;
        })
    }

    getRoom = (slug) => {
        return this.state.rooms.find(item => item.slug === slug)
    }

    render() {
        return (
            <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export default function WithRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return (<RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>)
    }
}

export { RoomProvider, RoomConsumer, RoomContext };