import React, { Component } from 'react'
// import items from './data'

const contentful = require("contentful");

const client = contentful.createClient({
    space: process.env.REACT_APP_API_SPACE,
    accessToken: process.env.REACT_APP_API_ACCESS_TOKEN
})

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        featuredRooms: [],
        sortedRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        maxPrice: 0,
        minPrice: 0,
        maxSize: 0,
        minSize: 0,
        breakfast: false,
        pets: false
    }

    getData = async () => {
        try {
            const response = await client.getEntries({ content_type: 'resortApp' });
            let rooms = this.formatData(response.items);
            let featuredRooms = rooms.filter((room) => room.featured);
            let maxPrice = Math.max(...rooms.map(item => item.price))
            let maxSize = Math.max(...rooms.map(item => item.size))
            this.setState({
                rooms, featuredRooms, sortedRooms: rooms, loading: false, maxPrice, maxSize, price: maxPrice
            })
        } catch (error) {
            console.log(error);
        }

    }

    componentDidMount() {
        // get Data
        this.getData();
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

    handleChange = event => {
        let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        let name = event.target.name;
        this.setState({
            [name]: value
        }, this.filterRooms)
    }

    filterRooms() {
        let { rooms, type, capacity, price, maxPrice, minSize, maxSize, breakfast, pets } = this.state
        // initialize tempRooms
        let tempRooms = rooms
        // transform values
        capacity = parseInt(capacity);
        price = parseInt(price);

        // type filter logic
        if (type !== 'all') {
            tempRooms = tempRooms.filter(item => item.type === type)
        }
        // capacity filter logic
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(item => item.capacity >= capacity)
        }
        // price filter logic
        if (price !== maxPrice) {
            tempRooms = tempRooms.filter(item => item.price <= price)
        }
        // size filter logic
        tempRooms = tempRooms.filter(item => item.size >= minSize && item.size <= maxSize)
        // breakfast checkbox
        if (breakfast) {
            tempRooms = tempRooms.filter(item => item.breakfast)
        }
        // pets checkbox
        if (pets) {
            tempRooms = tempRooms.filter(item => item.pets)
        }

        this.setState({
            sortedRooms: tempRooms
        })
    }

    render() {
        return (
            <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange }}>
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