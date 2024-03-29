
import { useState } from "react";
import axios from "axios";
export default function useAvailabilities() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<{time: string; available: boolean}[]| null>(null);

  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time,
  }: {
    slug: string;
    partySize: string;
    day: string;
    time: string;
  }) => {
    console.log({slug, partySize, day, time});
    
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/restaurant/${slug}/availability`,
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setLoading(false);
      setData(response.data.availabilities);
    
    } catch (err: any) {
      setLoading(false);
      setError(err.response.data.errorMessage);
      setData(null);
    }
      
  };
  return { loading, data, error, fetchAvailabilities };
}
