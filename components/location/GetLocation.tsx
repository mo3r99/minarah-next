import { useContext, useEffect, useState } from "react";
import {
  LocationContext,
} from "@/lib/context/locationContext";
import useLocation from "@/lib/hooks/useLocation";
import { LocationDialog } from "./LocationDialog";

import LoadingSpinner from "../layout/LoadingSpinner/LoadingSpinner";
import { Location } from "@/types";
import ManualLocationEntry from "./ManualLocationEntry";
export default function GetLocation() {
  const { setLocation } = useContext(LocationContext);
  const { loading, error, requestLocation } = useLocation();
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // // Try to get location immediately without alerting user, if they had previously allowed it.
  // useEffect(() => {
  //   requestLocation().then((location) => {
  //     if (!error) {
  //       setLocation(location ? location : defaultLocation);
  //     } else {
  //       setDialogOpen(true);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    if (error) {
      setDialogOpen(true);
    }
  }, [error, setDialogOpen]);

  async function handleLocationRequest() {
    const coordinates = await requestLocation();

    return coordinates;
  }

  return (
    <>
      <LocationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onContinue={handleLocationRequest}
        onManualEntry={() => {
          setDialogOpen(false);
          setShowManualEntry(true);
        }}
        error={error}
      />

      {showManualEntry && (
        <ManualLocationEntry
          onSubmit={(location: Location) => {
            setLocation(location);
            setShowManualEntry(false);
          }}
          onCancel={() => setShowManualEntry(false)}
        />
      )}

      {loading && <LoadingSpinner />}
    </>
  );
}
