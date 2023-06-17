import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import OfferTile from "./OfferTile.js";

export default function OfferListing() {
  const LOADING = "Loading offers";
  const ERROR = "Failed to load offers";

  // Fetch the latest holiday offers
  const { loading, error, data } = useQuery(GET_OFFERS, {
    variables: { limit: 10, sort: { by: "DATE_ADDED", order: "DESC" } },
  });

  // Mutation for marking an offer as visited
  const [markVisited] = useMutation(MARK_VISITED);

  // Handle click event for marking offer as visited
  const handleMarkVisited = async (offerId) => {
    try {
      await markVisited({ variables: { offerId } });
    } catch (error) {
      console.log("Failed to mark offer as visited:", error);
    }
  };

  if (loading) {
    return <div>{LOADING}</div>;
  }

  if (error) {
    return <div>{ERROR}</div>;
  }

  return (
    <div>
      {data.offers.map((offer) => (
        <OfferTile
          key={offer.id}
          name={offer.name}
          visitedCount={offer.visitedCount}
          price={`${offer.value} ${offer.currency}`}
          imageUrl={offer.imageUrl}
          description={offer.description || ""}
          clickHandler={() => handleMarkVisited(offer.id)}
        />
      ))}
    </div>
  );
}

const GET_OFFERS = gql`
  query GetOffers($limit: Int, $sort: Sort) {
    offers(limit: $limit, sort: $sort) {
      id
      name
      imageUrl
      description
      value
      currency
      visitedCount
    }
  }
`;

const MARK_VISITED = gql`
  mutation MarkVisited($offerId: String!) {
    markVisited(offerId: $offerId) {
      id
      visitedCount
    }
  }
`;
