import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type AssureProps = {
  title?: string;
  description?: string;
  trigger?: React.ReactNode; 
  onConfirm?: () => void; 
  open? : boolean
  handleOpen?: () => void;
};

const Assure: React.FC<AssureProps> = ({ title, description, trigger, onConfirm , open , handleOpen }) => {
  return (
    <AlertDialog open={open} onOpenChange={handleOpen}> 
   {
    !open && (
      <AlertDialogTrigger >{trigger}</AlertDialogTrigger>
    )
   }
      <AlertDialogContent className="bg-themeBlack">
        <AlertDialogHeader>
          <AlertDialogTitle>{title || "Are you absolutely sure?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || "This action cannot be undone. Please confirm before proceeding."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-themeBlack hover:bg-themeGray">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Assure;
