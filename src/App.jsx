import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Renderer from "./Renderer";

const GET_SCREEN = gql`
  query GetScreen($screenId: String!) {
    screenConfig(screenId: $screenId)
  }
`;

export default function App() {
  const { data, loading, error } = useQuery(GET_SCREEN, {
    variables: { screenId: "home" },
  });

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;
  if (error) return <div style={{ padding: 16 }}>Error: {error.message}</div>;

  return (
    <div style={{ padding: 16 }}>
      <Renderer node={data.screenConfig} />
    </div>
  );
}
