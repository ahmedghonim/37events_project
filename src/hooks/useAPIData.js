import useSWR from "swr";

export default function useAPIData() {
  const { data, error } = useSWR(
    "https://thirtysevenevents.perpetualbuild.com/wp-json/v1/page/home"
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
}
