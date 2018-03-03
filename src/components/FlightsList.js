import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    List,
    RaisedButton,
    CircularProgress
} from 'material-ui';

import { searchFlights } from '../actions';
import FlightListItem from './FlightListItem';

class FlightsList extends Component {
    constructor() {
        super();

        this.loadMore = this.loadMore.bind(this);
    }

    loadMore() {
        const {
            toValue,
            fromValue,
            dateValue,
            pageInfo,
            searchFlights,
        } = this.props;

        const {
            endCursor,
            hasNextPage
        } = pageInfo;

        if (hasNextPage) {
            searchFlights(fromValue, toValue, dateValue.format('YYYY-MM-DD'), endCursor);
        }
    }

    renderLoadMoreButton() {
        const { loadMoreButtonStyle } = styles;
        const { loading, hasNextPage } = this.props.pageInfo;

        if (loading) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <CircularProgress />
                </div>
            );
        }

        if (!hasNextPage) {
            return null;
        }

        return (
            <RaisedButton
                fullWidth
                label="Load more"
                onClick={this.loadMore}
                icon={<i className="material-icons">&#xE86A;</i>}
                style={loadMoreButtonStyle}
            />
        );
    }

    render() {
        const { containerStyle } = styles;

        return (
            <div>
                <List style={containerStyle}>
                    {this.props.flightsList.map(
                        (flight, i) => <FlightListItem key={flight.node.id} flight={flight.node} />
                    )}
                </List>
                {this.renderLoadMoreButton()}
            </div>
        );
    }
}

const styles = {
    containerStyle: {
        marginTop: 10,
        marginBottom: 10
    },
    loadMoreButtonStyle: {
        marginBottom: 20,
    }
};

const mapStateToProps = (state) => {
    const {
        flightsList,
        pageInfo,
        toValue,
        fromValue,
        dateValue
    } = state.search;

    return {
        flightsList,
        pageInfo,
        toValue,
        fromValue,
        dateValue
    };
};

export default connect(mapStateToProps, { searchFlights })(FlightsList);
