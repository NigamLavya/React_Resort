import React, { Component } from 'react'
import Title from '../components/Title'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa'

export default class services extends Component {
    state = {
        services: [
            {
                icon: <FaCocktail />,
                title: 'Free Cocktails',
                info: 'fsdafds sadf dsfdsfs dsfsda'
            },
            {
                icon: <FaHiking />,
                title: 'Endless Hiking',
                info: 'fsdafds sadf dsfdsfs dsfsda'
            },
            {
                icon: <FaShuttleVan />,
                title: 'Free Shuttle',
                info: 'fsdafds sadf dsfdsfs dsfsda'
            },
            {
                icon: <FaBeer />,
                title: 'Strongest Beer',
                info: 'fsdafds sadf dsfdsfs dsfsda'
            }
        ]
    }
    render() {
        return (
            <section className='services'>
                <Title title="services" />
                <div className="services-center">
                    {this.state.services.map((item, index) => {
                        return (
                            <article key={index} className='service'>
                                <span>{item.icon}</span>
                                <h6>{item.title}</h6>
                                <p>{item.info}</p>
                            </article>
                        )
                    })}
                </div>
            </section>
        )
    }
}
