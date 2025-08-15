import LocationIndicator from "@/components/location/LocationIndicator";
import MosquesList from "@/components/mosques/MosquesList/MosquesList";

export default function CongregationPage() {
  return (
    <>
      <LocationIndicator className="text-sm text-center">
        Showing Masjids near{" "}
      </LocationIndicator>

      <MosquesList className="mt-4 max-w-xl mx-auto"/>
    </>
  );
}
