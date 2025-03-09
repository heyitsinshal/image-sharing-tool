import { supabase } from "@/app";
import { useUser } from "@clerk/clerk-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const UploadImage = ({ reload }) => {
  const { user } = useUser();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const upload = async (file) => {
    const userId = user?.id || "";
    if (!userId) {
      setUploading(false);
      return;
    }

    const { data, error } = await supabase.storage
      .from(import.meta.env.VITE_SUPABASE_BUCKET)
      .upload(`${userId}/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file?.type,
      });

    if (data) {
      reload();
    }

    if (error) {
      toast(
        `ERROR: ${error?.message || "Something went wrong while uploading!"}`
      );
    }
    setUploading(false);
  };

  const handleFileChange = (e) => {
    setUploading(true);

    const file = e?.target?.files?.[0] || null;
    if (!file) setUploading(false);

    upload(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*"
      />
      <Button
        className=" hover:cursor-pointer"
        onClick={handleButtonClick}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </Button>
    </div>
  );
};

export default UploadImage;
