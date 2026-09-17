import { useEffect, useRef, useState } from "react";
import type { CVData } from "@/features/cv/types/cv.types";
import { TemplateRenderer } from "@/features/templates/registry";

const PAGE_WIDTH_PX = 794;

export function PreviewPane({ data, label = "Live preview" }: { data: CVData; label?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.55);
  const [pageHeight, setPageHeight] = useState(1123);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;

    const update = () => {
      const width = node.clientWidth - 24;
      setScale(Math.min(1, Math.max(0.35, width / PAGE_WIDTH_PX)));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = pageRef.current;
    if (!node) return;
    const updateHeight = () => setPageHeight(Math.max(1123, node.scrollHeight));
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);
    return () => observer.disconnect();
  }, [data]);

  return (
    <div ref={frameRef} className="h-full overflow-auto bg-[#eceee9] p-3">
      {label ? <p className="mb-2 text-xs text-muted">{label}</p> : null}
      <div className="flex justify-center">
        <div
          style={{
            width: PAGE_WIDTH_PX * scale,
            height: pageHeight * scale,
          }}
        >
          <div
            ref={pageRef}
            style={{
              width: PAGE_WIDTH_PX,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <TemplateRenderer data={data} mode="preview" />
          </div>
        </div>
      </div>
    </div>
  );
}
