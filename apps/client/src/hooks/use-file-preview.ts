import { useEffect, useState } from "react";

export default function useFilePreview(file: File | null) {
  const [fileSrc, setFileSrc] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const newUrl = URL.createObjectURL(file);

      if (newUrl !== fileSrc) {
        setFileSrc(newUrl);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return { fileSrc };
}
