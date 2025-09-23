import { useEffect, useState } from "react";
import { fetchRecords } from "../utils/fetchRecords";
interface RecordType {
  data_id: number;
  energy_type: string;
  energy_amount: string;
  tea_processed_amount: string;
  created_at: string;
  updated_at: string;
  co2_equivalent: string;
  factory: number;
}
const useFetchRecords = () => {
  const [records, setRecords] = useState<RecordType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetchRecords();
        setRecords(response ?? []);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { records, loading, error };
};
export default useFetchRecords;