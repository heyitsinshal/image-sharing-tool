import { supabase } from "@/app";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "./ui/button";

const Public = () => {
  const { userId, imageName } = useParams();
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const download = async () => {
    setIsDownloading(true);
    const { data, error } = await supabase.storage
      .from(import.meta.env.VITE_SUPABASE_BUCKET)
      .download(`${userId}/${imageName}`);

    if (data) {
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = imageName;
      a.click();
    }

    setIsDownloading(false);
  };

  useEffect(() => {
    const getPreviewUrl = async () => {
      const { data, error } = supabase.storage
        .from(import.meta.env.VITE_SUPABASE_BUCKET)
        .getPublicUrl(`${userId}/${imageName}`);

      setPreviewUrl(data?.publicUrl || "");
    };
    getPreviewUrl();
  }, [userId, imageName]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="p-4 border-b border-b-zinc-700 flex justify-between sticky top-0 bg-background">
        <h1 className="text-2xl font-bold">{imageName}</h1>

        <Button onClick={download} className="hover:cursor-pointer">
          {isDownloading ? "Downloading.." : "Download"}
        </Button>
      </header>

      <div className="grow-1 m-4 rounded-xl flex justify-center items- center">
        {previewUrl === null ? (
          <>
            <div>
              <p>Loading preview..</p>
            </div>
          </>
        ) : (
          <img src={previewUrl} alt={imageName} className=" object-contain" />
        )}
      </div>
    </div>
  );
};

export default Public;
