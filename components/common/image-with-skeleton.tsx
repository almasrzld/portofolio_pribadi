"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface ImageWithSkeletonProps extends Omit<ImageProps, "onLoad"> {
  containerClassName?: string;
  skeletonClassName?: string;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export function ImageWithSkeleton({
  src,
  alt,
  className,
  containerClassName,
  skeletonClassName,
  loading = "lazy",
  onLoad,
  fill,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        fill && "w-full h-full",
        containerClassName
      )}
    >
      {isLoading && (
        <Skeleton
          className={cn(
            "absolute inset-0 z-10 w-full h-full rounded-[inherit]",
            skeletonClassName
          )}
        />
      )}
      <Image
        src={src}
        alt={alt}
        loading={loading}
        fill={fill}
        onLoad={(e) => {
          setIsLoading(false);
          if (onLoad) onLoad(e);
        }}
        className={cn(
          "transition-opacity duration-500 ease-in-out",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        {...props}
      />
    </div>
  );
}

export default ImageWithSkeleton;
