import { ImagePlus, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import useFilePreview from "@/hooks/use-file-preview";
import { SchemaEditProfile } from "../../api/edit-profile";
import { getCroppedImg } from "../../utils/crop-image";

export function EditProfilePictureDialog() {
  const form = useFormContext<SchemaEditProfile>();

  const [open, setOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState([1]);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const profilePictureValue = form.watch("profilePicture");
  const { fileSrc } = useFilePreview(profilePictureValue);

  function onCropComplete(_croppedArea: Area, croppedAreaPixels: Area) {
    setCroppedAreaPixels(croppedAreaPixels);
  }

  async function onApplyCrop() {
    if (fileSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(fileSrc, croppedAreaPixels, 0);
      if (croppedImage) form.setValue("profilePicture", croppedImage.file);
    }
    // reset to default
    setCrop({ x: 0, y: 0 });
    setZoom([1]);

    setOpen(false);
  }

  return (
    <>
      <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto">
        <Image
          layout="fill"
          src={fileSrc ?? "/default-profile-picture.jpg"}
          alt="profile picture"
        />
        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <div className="absolute inset-0 w-full h-full z-20 flex items-center justify-center bg-black/20">
                    <label
                      htmlFor="profile-picture"
                      className="bg-black/50 p-3 rounded-full cursor-pointer"
                    >
                      <ImagePlus width={18} height={18} />
                    </label>
                    <Input
                      type="file"
                      id="profile-picture"
                      className="hidden"
                      accept="image/*"
                      onChange={(event) => {
                        field.onChange(
                          event.target.files ? event.target.files[0] : null,
                        );

                        setOpen(true);
                      }}
                    />
                  </div>
                </FormControl>
              </FormItem>
            );
          }}
        />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Media</DialogTitle>
          </DialogHeader>
          {fileSrc && (
            <div>
              <div className="relative w-full h-[300px]">
                <Cropper
                  image={fileSrc}
                  crop={crop}
                  zoom={zoom[0]}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={(value) => setCrop(value)}
                  onCropComplete={onCropComplete}
                  onZoomChange={(value) => setZoom([value])}
                />
              </div>
              <div className="flex gap-3 items-center">
                <ZoomOut />
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onValueChange={(value) => setZoom(value)}
                />
                <ZoomIn />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" onClick={onApplyCrop}>
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
