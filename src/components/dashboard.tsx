import { useParams } from "react-router-dom";

export function Dashboard() {
  const { city } = useParams()
  return (
    <>{city}</>
  );
}
