import React from 'react'
import RoomFilter from './RoomFilter'
import RoomList from './RoomList'
import WithRoomConsumer from '../Context'
import Loading from './Loader'

function RoomContainer({ context }) {
    const { loading, rooms, sortedRooms } = context
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <>
            <RoomFilter rooms={rooms} />
            <RoomList rooms={sortedRooms} />
        </>
    )
}

export default WithRoomConsumer(RoomContainer);
