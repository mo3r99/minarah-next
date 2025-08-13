import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { MapPinOff } from "lucide-react";

interface LocationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onContinue: () => void;
    onManualEntry: () => void;
    error?: string | null;
}

export function LocationDialog({
    open,
    onOpenChange,
    onContinue,
    onManualEntry,
    error
}: LocationDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex gap-2">
                        <MapPinOff />
                        {error ? 'Unable to Access Location' : 'Location Required'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {error 
                            ? 'Minarah was unable to access your location. Please retry or manually enter your location.'
                            : 'Your location is required to show local Salah times.'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button onClick={onContinue}>
                        {error ? 'Try Again' : 'Continue'}
                    </Button>
                    {error && (
                        <Button onClick={onManualEntry} variant='outline'>
                            Enter Manually
                        </Button>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}