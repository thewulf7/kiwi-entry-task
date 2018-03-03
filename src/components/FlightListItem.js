import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    List,
    ListItem,
    Card,
    RaisedButton,
    Divider,
    CardMedia,
    CardTitle
} from 'material-ui';

class FlightListItem extends Component {
    static propTypes = {
        flight: PropTypes.object.isRequired
    }

    getCityImage() {
        const { flight } = this.props;
        const img = `https://images.kiwi.com/photos/600x330/${flight.arrival.airport.city.locationId}.jpg`;
        const { imageOverlayContentStyle } = styles;

        return (
            <CardMedia
                overlayContentStyle={imageOverlayContentStyle}
                overlay={<h1 style={{ color: 'white', margin: 0 }}>{flight.arrival.airport.locationId}</h1>}
            >
                <img src={img} alt="" style={{ width: '64px' }} />
            </CardMedia>
        );
    }


    renderFlightLegs() {
        const { flight } = this.props;
        const {
            ticketLegStyle,
            ticketLegBlockStyle,
            ticketLegCentralBlockStyle,
            ticketLegAirlineLogoStyle,
            ticketLegAirlineBlockLogoStyle
        } = styles;

        return flight.legs.map(
            (leg, i) => {
                return (
                    <div key={`${flight.id}-${leg.flightNumber}`}>
                        <ListItem disabled>
                            <div style={ticketLegStyle}>
                                <div style={ticketLegAirlineBlockLogoStyle}>
                                    <img
                                        src={leg.airline.logoUrl}
                                        alt={leg.airline.name}
                                        style={ticketLegAirlineLogoStyle}
                                    />
                                </div>
                                <div style={ticketLegBlockStyle}>
                                    <h2>{moment(leg.departure.localTime).format('hh:mm')}</h2>
                                    <h4>{leg.departure.airport.locationId}</h4>
                                </div>
                                <div style={ticketLegCentralBlockStyle}>
                                    <div style={{ width: '100%' }}>
                                        <div>
                                            <i className="material-icons">&#xE905;</i>
                                            <i className="material-icons" style={{ float: 'right' }}>&#xE904;</i>
                                        </div>
                                        <Divider style={{ height: 3 }} />
                                        <div style={{ textAlign: 'center' }}>
                                            <span style={{
                                                fontSize: 12,
                                                color: '#aaa'
                                            }}
                                            >{`${Math.floor(leg.duration / 60)}h ${leg.duration % 60}m`}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={ticketLegBlockStyle}>
                                    <h2>{moment(leg.arrival.localTime).format('hh:mm')}</h2>
                                    <h4>{leg.arrival.airport.locationId}</h4>
                                </div>
                            </div>
                        </ListItem>
                        {i !== flight.legs.length - 1 && <Divider />}
                    </div>
                );
            }
        );
    }

    render() {
        const { flight } = this.props;
        const { ticketContainerStyle, ticketLeftBlockStyle, ticketRightBlockStyle } = styles;
        return (
            <ListItem disabled>
                <Card style={ticketContainerStyle}>
                    <CardTitle
                        title={`${flight.departure.airport.locationId} - ${flight.arrival.airport.locationId}`}
                        subtitle={`${flight.departure.airport.city.name} - ${flight.arrival.airport.city.name}`}
                    />
                    <div style={{ display: 'flex' }}>
                        <div style={ticketLeftBlockStyle}>
                            {this.getCityImage()}
                            <br />
                            <RaisedButton
                                primary
                                target="_blank"
                                href={flight.bookingUrl}
                                label={`Buy at ${flight.price.amount} ${flight.price.currency}`}
                                labelStyle={{ fontSize: 16 }}
                            />
                        </div>
                        <div style={ticketRightBlockStyle}>
                            <List style={{ width: '100%' }}>
                                {this.renderFlightLegs()}
                            </List>
                        </div>
                    </div>
                </Card>
            </ListItem>
        );
    }
}


const styles = {
    ticketContainerStyle: {
        //
    },
    ticketLeftBlockStyle: {
        borderRight: 1,
        borderRightColor: 'rgb(224, 224, 224)',
        borderRightStyle: 'solid',
        padding: '15px'
    },
    ticketRightBlockStyle: {
        display: 'flex',
        flexGrow: 1,
        minWidth: '75%',
    },
    ticketLegStyle: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    ticketLegBlockStyle: {
        flexGrow: 1,
        textAlign: 'center'
        // minWidth: '25%'
    },
    ticketLegCentralBlockStyle: {
        flexGrow: 5,
        display: 'flex',
        alignItems: 'center'
        // minWidth: '50%'
    },
    ticketLegAirlineBlockLogoStyle: {
        display: 'flex',
        alignItems: 'center',
        paddingRight: 15
    },
    ticketLegAirlineLogoStyle: {
        width: 32,
    },
    imageOverlayContentStyle: {
        paddingTop: 0,
        top: 0,
        background: 'rgba(0, 0, 0, 0.24)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
};

export default FlightListItem;
