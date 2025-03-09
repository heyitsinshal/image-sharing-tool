import { supabase } from "@/app";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import ImageListItem from "./image-list-item";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Skeleton } from "./ui/skeleton";
import UploadImage from "./upload-image";

const ImagesList = () => {
  const { user } = useUser();
  const [files, setFiles] = useState(null);

  const getFiles = async () => {
    const userId = user?.id || "";
    if (!userId) return;

    const { data, error } = await supabase.storage
      .from(import.meta.env.VITE_SUPABASE_BUCKET)
      .list(userId, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (data?.length > 0) {
      setFiles(data?.filter((f) => f?.name !== ".emptyFolderPlaceholder"));
    }
  };

  useEffect(() => {
    getFiles();
  }, [user]);

  return (
    <div className="p-4 ">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Images</h1>

        <UploadImage reload={getFiles} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="grow-2">Name</TableHead>
            <TableHead className="grow-1">Uploaded At</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files === null ? (
            <>
              <TableRow>
                <TableCell>
                  <Skeleton className="w-full h-9" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-9" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-9" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="w-full h-9" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-9" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-9" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="w-full h-9" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-9" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-9" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="w-full h-9" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-9" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-9" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="w-full h-9" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-9" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-9" />
                </TableCell>
              </TableRow>
            </>
          ) : files?.length === 0 ? (
            <TableRow>
              <TableCell>
                <p>No images found.</p>
              </TableCell>
            </TableRow>
          ) : (
            files.map((file) => (
              <ImageListItem key={file.id} file={file} reload={getFiles} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ImagesList;
