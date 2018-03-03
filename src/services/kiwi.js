import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

const client = new ApolloClient(
    {
        link: new HttpLink({ uri: 'https://graphql.kiwi.com/' }),
        cache: new InMemoryCache()
    }
);

export const getKiwiFlights = (locationFrom, locationTo, date, currency = 'CZK', locale = 'en_US') => {
    return client.query(
        {
            query: gql`
                query Flights($locationFrom: String!, $locationTo: String!, $date: Date!, $currency: String!, $locale: String! ) {
                    allFlights(
                        search: { 
                            from: {location: $locationFrom},
                            to: {location: $locationTo},
                            date: {exact: $date}
                        },
                        options: { currency: $currency, locale: $locale }
                    ) {
                        edges {
                            node {
                                id
                                departure {
                                    airport {
                                        locationId
                                        city {
                                            locationId
                                            name
                                        }
                                    }
                                    time
                                    localTime
                                }
                                arrival {
                                    airport {
                                        locationId
                                        city {
                                            locationId
                                            name
                                        }
                                    }
                                    time
                                    localTime
                                }
                                legs {
                                    flightNumber
                                    duration
                                    airline {
                                        name
                                        logoUrl
                                    }
                                    departure {
                                        time
                                        localTime
                                        airport {
                                            name
                                            locationId
                                            city {
                                                name
                                            }
                                        }
                                    }
                                    arrival {
                                        time
                                        localTime
                                        airport {
                                            name
                                            locationId
                                            city {
                                                name
                                            }
                                        }
                                    }
                                }
                                duration
                                bookingUrl
                                price {
                                    amount
                                    currency
                                }
                            }
                        }
                        pageInfo {
                            startCursor
                            endCursor
                            hasNextPage
                            hasPreviousPage
                        }
                    }
                }
            `,
            variables: {
                locationFrom,
                locationTo,
                date,
                currency,
                locale
            }
        }
    );
};

export const getKiwiLocations = (value, limit = 5, locale = 'en_US') => {
    return client.query(
        {
            query: gql`
                query Locations($value: String, $limit: Int, $locale: Locale) {
                    allLocations(search: $value, first: $limit, options: { locale: $locale }) {
                        edges {
                            node {
                                name
                                locationId
                                type
                            }
                        }
                    }
                }
            `,
            variables: {
                value,
                limit,
                locale
            }
        }
    );
};
