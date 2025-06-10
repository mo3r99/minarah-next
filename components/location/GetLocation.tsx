import { useContext, useEffect, useState } from "react";
import { LocationContext } from "@/lib/context/locationContext";
import { geolocationService } from "@/lib/services/location/geolocation";
import { storageService } from "@/lib/services/storage/storageService";
import LoadingSpinner from "../layout/LoadingSpinner/LoadingSpinner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


export default function GetLocation() {
  const { setLocation } = useContext(LocationContext);
  const [noLocation, setNolocation] = useState(false);
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLocationRequest = async () => {
    try {
      setLoading(true);
      const locationData = await geolocationService.getCurrentLocation();

      setLocation(locationData);
      storageService.savePreferences({ location: locationData });
      setLoading(false);
    } catch (error) {
      console.warn(error);
      setLoading(false);
      setNolocation(true);
    }
  };

  useEffect(() => {
    handleLocationRequest();
  }, [open])

  useEffect(()=> {
    setOpen(true);
  }, [noLocation])

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Location Required</AlertDialogTitle>
            <AlertDialogDescription>
              Your location is required to show local Salah times. Please press
        continue to proceed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={noLocation} onOpenChange={setNolocation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unable to Access Location</AlertDialogTitle>
            <AlertDialogDescription>
              Minarah was unable to access your location. Please allow Minarah access to your location and then try again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {loading && <LoadingSpinner />}
    </>
  );
}
