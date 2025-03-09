import { useUser } from "@clerk/clerk-react";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { supabase } from "@/app";
import dayjs from "dayjs";

const ImageListItem = ({ file, reload }) => {
  const { user } = useUser();
  const userId = useMemo(() => user?.id || "", [user]);
  const [isCopied, setIsCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const generateUrl = () =>
    `${window.location.origin}/public/${userId}/${file?.name}`;

  const handleCopyLink = () => {
    const link = generateUrl();
    navigator.clipboard.writeText(link).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    });
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    const { data, error } = await supabase.storage
      .from(import.meta.env.VITE_SUPABASE_BUCKET)
      .remove([`${userId}/${file.name}`]);

    if (data) {
      reload();
    }
  };

  return (
    <>
      <TableRow key={file.id}>
        <TableCell className="font-medium">{file.name}</TableCell>
        <TableCell className="font-medium">
          {dayjs(file.created_at).format("HH:mm A, MMMM D, YYYY")}
        </TableCell>
        <TableCell className="font-medium">
          <Button
            variant="secondary"
            className="hover:cursor-pointer"
            onClick={() => {
              window.open(generateUrl(), "_blank");
            }}
          >
            Open Link
          </Button>
          <Button
            variant="secondary"
            className="hover:cursor-pointer ml-2"
            onClick={handleCopyLink}
          >
            {isCopied ? "Copied!" : "Copy Link"}
          </Button>
          <Button
            variant="destructive"
            className="hover:cursor-pointer ml-2"
            onClick={handleDelete}
          >
            {isDeleting ? "Deleting.." : "Delete"}
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ImageListItem;
